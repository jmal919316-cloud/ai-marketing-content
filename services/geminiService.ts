import { GoogleGenAI } from "@google/genai";
import type { MarketingContent, ProductDetails } from './types.ts';
import { SYSTEM_PROMPT, RESPONSE_SCHEMA } from './constants.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// تم دمج التعليمات الأساسية (System Prompt) مع تفاصيل المنتج في دالة واحدة.
function buildFullPrompt(details: ProductDetails): string {
  let userPrompt = `البيانات:\n`;
  userPrompt += `- اسم المنتج: ${details.productName}\n`;
  userPrompt += `- الفئة: ${details.category}\n`;
  if (details.price) {
    userPrompt += `- السعر التقريبي: ${details.price}\n`;
  }
  if (details.notes) {
    userPrompt += `- ملاحظات: ${details.notes}\n`;
  }
  userPrompt += `\nالمطلوب: قم بتوليد المحتوى التسويقي بناءً على البيانات والقواعد المحددة.`;
  
  // دمج التعليمات الأساسية مع طلب المستخدم لإنشاء طلب واحد متكامل.
  return `${SYSTEM_PROMPT}\n\n---\n\n${userPrompt}`;
}

export const generateMarketingContent = async (details: ProductDetails): Promise<MarketingContent> => {
  try {
    const prompt = buildFullPrompt(details);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // يتم الآن إرسال الطلب المتكامل والمدمج.
        contents: prompt,
        config: {
            // تم إزالة معلمة systemInstruction لتبسيط الطلب.
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
            temperature: 0.7,
        }
    });

    const jsonText = response.text.trim();
    if (!jsonText.startsWith('{') && !jsonText.startsWith('[')) {
        console.error("Received non-JSON response:", jsonText);
        throw new Error('Invalid JSON response from API');
    }
    const parsedContent: MarketingContent = JSON.parse(jsonText);
    
    return parsedContent;

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    if (error instanceof Error) {
        console.error("Error message:", error.message);
    }
    throw new Error("Failed to generate marketing content.");
  }
};