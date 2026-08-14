// Minimal backend for Serofero.
//
// The ONLY job this server has today is to keep GEMINI_API_KEY off the client.
// Do not add `GEMINI_API_KEY` to anything that ships to the browser (Vite
// `define`, a public .env, a client-side import, etc.) — read it here, only.
//
// Run locally:   node server/index.js   (or `npm run server`)
// Deploy:        any Node host works (Cloud Run, Render, Railway, Fly...).
//                Set GEMINI_API_KEY as a server-side secret/env var there,
//                and point the deployed frontend at this server's URL
//                (see API_PROXY_TARGET in vite.config.ts for local dev,
//                and configure your production reverse proxy / rewrite for
//                the built app to route /api/* to this service).

import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  // Fail loudly at boot rather than silently 500-ing on first request.
  console.error('[server] GEMINI_API_KEY is not set. Set it in your server environment (.env locally, secret manager in prod).');
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.post('/api/generate-description', async (req, res) => {
  try {
    const { itemName, category } = req.body || {};

    if (typeof itemName !== 'string' || !itemName.trim() ||
        typeof category !== 'string' || !category.trim()) {
      return res.status(400).json({ error: 'itemName and category are required strings.' });
    }
    if (!ai) {
      return res.status(500).json({ error: 'AI service is not configured on the server.' });
    }

    // Basic length guard so a malicious client can't use this endpoint to
    // send arbitrarily large prompts through your API key.
    const safeItemName = itemName.slice(0, 100);
    const safeCategory = category.slice(0, 50);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, friendly second-hand marketplace description for a "${safeItemName}" in the "${safeCategory}" category. The target audience is in Nepal. Keep it under 100 words.`,
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('[server] /api/generate-description error:', err);
    res.status(502).json({ error: 'Failed to generate description.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`[server] Serofero API proxy listening on http://localhost:${port}`);
});
