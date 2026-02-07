
import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartSchedule = async (
  brainDump: string,
  existingTasks: string
): Promise<AIPlanResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Help me plan my day. 
        Context: 
        My current tasks: ${existingTasks}
        My raw thoughts for today: ${brainDump}
        
        Create a structured schedule that balances deep work and rest.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendedSchedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  category: { type: Type.STRING },
                  duration: { type: Type.STRING },
                },
                required: ["time", "activity", "category", "duration"],
              },
            },
            motivationalQuote: { type: Type.STRING },
          },
          required: ["summary", "recommendedSchedule", "motivationalQuote"],
        },
      },
    });

    return JSON.parse(response.text) as AIPlanResponse;
  } catch (error) {
    console.error("Gemini optimization failed", error);
    return null;
  }
};
