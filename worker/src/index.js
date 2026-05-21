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
      if (url.pathname === '/ranking' && request.method === 'GET') {
        return await handleRanking(env);
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

  const { nome, pontuacao, tempoJogo } = body;

  const doc = {
    fields: {
      nome:      { stringValue: String(nome).slice(0, 60) },
      pontuacao: { integerValue: String(Math.max(0, Math.floor(Number(pontuacao)))) },
      tempoJogo: { integerValue: String(Math.max(0, Math.floor(Number(tempoJogo) || 0))) },
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

async function handleRanking(env) {
  const query = {
    structuredQuery: {
      from: [{ collectionId: 'scores' }],
      orderBy: [{ field: { fieldPath: 'pontuacao' }, direction: 'DESCENDING' }],
      limit: 10,
    },
  };

  const resp = await firestoreQuery(env, query);
  if (!resp.ok) {
    return json({ error: 'Erro ao buscar ranking' }, 502);
  }

  const data = await resp.json();
  const ranking = data
    .filter(r => r.document)
    .map(r => ({
      nome:      r.document.fields.nome?.stringValue      ?? '?',
      pontuacao: Number(r.document.fields.pontuacao?.integerValue ?? 0),
      tempoJogo: Number(r.document.fields.tempoJogo?.integerValue ?? 0),
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
