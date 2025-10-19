import { Type } from "@google/genai";

export const SYSTEM_PROMPT = `
أنت مساعد تسويق ذكي متخصص في كتابة المحتوى للمتاجر الإلكترونية باللغة العربية.
مهمتك هي توليد محتوى جذّاب واحترافي لأي منتج، بصوت العلامة التجارية، وبأسلوب إبداعي مقنع.

المطلوب منك توليده:
1.  **وصف تسويقي رئيسي (Product Description):** نص قصير ومؤثر يصف المنتج بطريقة تجعل القارئ يرغب في شرائه فوراً.
2.  **منشور لمواقع التواصل الاجتماعي (Social Media Post):** صيغة جذّابة مع رموز تعبيرية (emojis) تناسب النشر على Instagram وFacebook.
3.  **عنوان إعلاني قصير (Ad Headline):** لا يزيد عن 7 كلمات ويشدّ الانتباه.
4.  **نقاط البيع الفريدة (USP):** 3 نقاط مختصرة توضّح مميزات المنتج أو ما يميّزه عن المنافسين.
5.  **هاشتاغات ذكية (Hashtags):** قائمة من 5 إلى 10 هاشتاغات مرتبطة بالمنتج والفئة.

قواعد الأسلوب:
-   استخدم لغة قريبة من الزبون، ودافئة، دون مبالغة أو غموض.
-   لا تذكر أسماء منافسين.
-   اجعل الجمل قصيرة ومباشرة، ولا تكرر نفس الفكرة بألفاظ مختلفة.
-   أضف القليل من الطابع الإنساني والمرح عندما يناسب الفئة.
-   يجب أن يكون الناتج بصيغة JSON حصراً بناءً على المخطط المحدد.
`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    productDescription: {
      type: Type.STRING,
      description: "وصف تسويقي رئيسي للمنتج.",
    },
    socialMediaPost: {
      type: Type.STRING,
      description: "منشور جذاب لمواقع التواصل الاجتماعي مع رموز تعبيرية.",
    },
    adHeadline: {
      type: Type.STRING,
      description: "عنوان إعلاني قصير لا يزيد عن 7 كلمات.",
    },
    uniqueSellingPoints: {
      type: Type.ARRAY,
      description: "قائمة من 3 نقاط بيع فريدة ومختصرة.",
      items: { type: Type.STRING },
    },
    hashtags: {
      type: Type.ARRAY,
      description: "قائمة من 5 إلى 10 هاشتاغات ذكية.",
      items: { type: Type.STRING },
    },
  },
  required: [
    "productDescription",
    "socialMediaPost",
    "adHeadline",
    "uniqueSellingPoints",
    "hashtags",
  ],
};