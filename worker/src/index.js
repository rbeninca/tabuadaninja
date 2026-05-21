const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);

    try {
      if (url.pathname === '/score' && request.method === 'POST') {
        return await handleSaveScore(request, env);
      }
      if (url.pathname === '/ranking/last-update' && request.method === 'GET') {
        return await handleLastUpdate(url, env);
      }
      if (url.pathname === '/ranking' && request.method === 'GET') {
        return await handleRanking(url, env);
      }
      return json({ error: 'Not found' }, 404);
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  },
};

async function handleSaveScore(request, env) {
  const body = await request.json().catch(() => null);
  if (!body || !body.nome || body.pontuacao === undefined) {
    return json({ error: 'Dados inválidos' }, 400);
  }

  const { nome, pontuacao, tempoJogo, turma } = body;

  const doc = {
    fields: {
      nome:      { stringValue: String(nome).slice(0, 60) },
      pontuacao: { integerValue: String(Math.max(0, Math.floor(Number(pontuacao)))) },
      tempoJogo: { integerValue: String(Math.max(0, Math.floor(Number(tempoJogo) || 0))) },
      turma:     { stringValue: String(turma || '').slice(0, 60) },
      data:      { timestampValue: new Date().toISOString() },
    },
  };

  const resp = await firestoreWrite(env, 'scores', doc);
  if (!resp.ok) {
    const err = await resp.text();
    console.error('Firestore write error:', err);
    return json({ error: 'Erro ao salvar no Firebase' }, 502);
  }

  return json({ ok: true });
}

// Retorna o timestamp do registro mais recente — 1 leitura no Firestore.
// Turma: usa índice composto (turma ASC, data ASC) lido em reverso para obter o mais recente.
// Global: orderBy data DESC com índice de campo único.
async function handleLastUpdate(url, env) {
  const turma = url.searchParams.get('turma') || '';

  const structured = {
    from: [{ collectionId: 'scores' }],
    orderBy: [{ field: { fieldPath: 'data' }, direction: 'DESCENDING' }],
    limit: 1,
    select: { fields: [{ fieldPath: 'data' }] },
  };

  if (turma) {
    structured.where = {
      fieldFilter: { field: { fieldPath: 'turma' }, op: 'EQUAL', value: { stringValue: turma } },
    };
  }

  const resp = await firestoreQuery(env, { structuredQuery: structured });
  if (!resp.ok) return json({ updatedAt: null });

  const data = await resp.json();
  const doc = data.find(r => r.document);
  const updatedAt = doc?.document?.fields?.data?.timestampValue ?? null;

  return json({ updatedAt });
}

// Retorna registros ordenados por data ASC.
// Com ?since=<iso> retorna apenas os mais novos que esse timestamp.
// Com ?turma=X filtra pela turma (índice composto turma+data, Collection Group scope).
async function handleRanking(url, env) {
  const since = url.searchParams.get('since');
  const turma = url.searchParams.get('turma') || '';

  const structured = {
    from: [{ collectionId: 'scores' }],
    orderBy: [{ field: { fieldPath: 'data' }, direction: 'ASCENDING' }],
  };

  const filters = [];
  if (turma) filters.push({ fieldFilter: { field: { fieldPath: 'turma' }, op: 'EQUAL',        value: { stringValue:   turma } } });
  if (since) filters.push({ fieldFilter: { field: { fieldPath: 'data'  }, op: 'GREATER_THAN', value: { timestampValue: since } } });

  if (filters.length === 2) {
    structured.where = { compositeFilter: { op: 'AND', filters } };
  } else if (filters.length === 1) {
    structured.where = filters[0];
  }

  const resp = await firestoreQuery(env, { structuredQuery: structured });
  if (!resp.ok) {
    const detail = await resp.text();
    return json({ error: 'Erro ao buscar ranking', detail }, 502);
  }

  const data = await resp.json();
  const ranking = data
    .filter(r => r.document)
    .map(r => ({
      nome:      r.document.fields.nome?.stringValue      ?? '?',
      pontuacao: Number(r.document.fields.pontuacao?.integerValue ?? 0),
      tempoJogo: Number(r.document.fields.tempoJogo?.integerValue ?? 0),
      turma:     r.document.fields.turma?.stringValue     ?? '',
      data:      r.document.fields.data?.timestampValue   ?? '',
    }));

  return json(ranking);
}

// ── Firebase helpers ───────────────────────────────────────────────────────────

function firestoreWrite(env, collection, doc) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${collection}?key=${env.FIREBASE_API_KEY}`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc),
  });
}

function firestoreQuery(env, query) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery?key=${env.FIREBASE_API_KEY}`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
