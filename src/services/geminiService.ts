// NOTE (security): This file used to call `@google/genai` directly from the
// browser with `process.env.GEMINI_API_KEY`, which gets baked into the shipped
// JS bundle as plain text by Vite's `define`. That means anyone could open
// devtools, read the key out of the bundle, and use it on your billing account.
//
// Fix: the client now calls our own backend endpoint (server/index.js), which
// holds the real GEMINI_API_KEY server-side and forwards the request to Gemini.
// The key never reaches the browser.

export const generateItemDescription = async (
  itemName: string,
  category: string
): Promise<string> => {
  const response = await fetch('/api/generate-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemName, category }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `AI description request failed (${response.status})`);
  }

  const data = await response.json();
  return data.text as string;
};
