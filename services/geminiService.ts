
import { GoogleGenAI, Type } from "@google/genai";
import type { MarketingContent, ProductDetails } from '../types';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildUserPrompt(details: ProductDetails): string {
  let prompt = `البيانات:\n`;
  prompt += `- اسم المنتج: ${details.productName}\n`;
  prompt += `- الفئة: ${details.category}\n`;
  if (details.price) {
    prompt += `- السعر التقريبي: ${details.price}\n`;
  }
  if (details.notes) {
    prompt += `- ملاحظات: ${details.notes}\n`;
  }
  prompt += `\nالمطلوب: قم بتوليد المحتوى التسويقي بناءً على البيانات والقواعد المحددة.`;
  return prompt;
}

export const generateMarketingContent = async (details: ProductDetails): Promise<MarketingContent> => {
  try {
    const userPrompt = buildUserPrompt(details);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
            systemInstruction: SYSTEM_PROMPT,
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
            temperature: 0.7,
        }
    });

    const jsonText = response.text.trim();
    const parsedContent: MarketingContent = JSON.parse(jsonText);
    
    return parsedContent;

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    throw new Error("Failed to generate marketing content.");
  }
};
