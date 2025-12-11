import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Nora, a sophisticated, elegant, and knowledgeable local guide for Dubai. 
You were created by flight attendants Aurea and Valeria.
Your tone is warm, professional, "insider", and helpful. You know the best hidden gems, luxury spots, and cultural etiquette.
Keep responses concise (under 100 words unless asked for more), useful, and polite.
If asked about prices, you use Dirhams (AED) or USD.
You represent the brand "NORA.GUIAi".
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // In Vercel deployment, ensure 'API_KEY' is set in your Project Settings > Environment Variables
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.error("API Key is missing. Please set API_KEY in your environment variables.");
      return "Olá! Sou a Nora. Meu sistema de inteligência está aguardando configuração. Se você é o administrador, por favor configure a variável de ambiente API_KEY no painel da Vercel.";
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Desculpe, estou recalculando a rota. Tente novamente em um instante.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Desculpe, tive um pequeno problema de conexão. Por favor, tente novamente.";
  }
};