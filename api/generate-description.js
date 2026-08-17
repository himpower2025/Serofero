// Vercel Serverless Function:  POST /api/generate-description
//
// This is the production counterpart to server/index.js. Vercel does not run
// the Express app in server/ — it only runs files in this /api directory — so
// without this file the "AI description" button 404s on the deployed site.
//
// GEMINI_API_KEY must be set in Vercel → Project → Settings → Environment
// Variables. It is read here, server-side, and never reaches the browser.

import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[api] GEMINI_API_KEY is not set in this environment.');
    return res.status(500).json({ error: 'AI service is not configured on the server.' });
  }

  try {
    const { itemName, category } = req.body || {};

    if (
      typeof itemName !== 'string' || !itemName.trim() ||
      typeof category !== 'string' || !category.trim()
    ) {
      return res.status(400).json({ error: 'itemName and category are required strings.' });
    }

    // Length guard so the endpoint cannot be used to push arbitrarily large
    // prompts through Himpower's API key.
    const safeItemName = itemName.slice(0, 100);
    const safeCategory = category.slice(0, 50);

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, friendly second-hand marketplace description for a "${safeItemName}" in the "${safeCategory}" category. The target audience is in Nepal. Keep it under 100 words.`,
    });

    return res.status(200).json({ text: response.text });
  } catch (err) {
    console.error('[api] generate-description error:', err);
    return res.status(502).json({ error: 'Failed to generate description.' });
  }
}
