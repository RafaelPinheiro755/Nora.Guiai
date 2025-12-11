import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    if (!API_KEY) {
      // Fallback for demo purposes if no key is present in environment
      return "Olá! Eu sou a Nora. Para ativar minha inteligência completa, por favor configure a chave de API. Por enquanto, posso dizer que Dubai é maravilhosa nesta época do ano! 🇦🇪";
    }

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