import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateItemDescription = async (itemName: string, category: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a short, friendly second-hand marketplace description for a "${itemName}" in the "${category}" category. The target audience is in Nepal. Keep it under 100 words.`,
  });
  return response.text;
};
