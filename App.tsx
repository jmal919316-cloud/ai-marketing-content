
import React, { useState, useCallback } from 'react';
import { generateMarketingContent } from './services/geminiService';
import type { MarketingContent } from './types';
import { InputGroup } from './components/InputGroup';
import { OutputCard } from './components/OutputCard';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  
  const [generatedContent, setGeneratedContent] = useState<MarketingContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !category) {
        setError('الرجاء إدخال اسم المنتج والفئة على الأقل.');
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const content = await generateMarketingContent({ productName, category, price, notes });
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [productName, category, price, notes]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            مساعد التسويق الذكي
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            ولّد محتوى تسويقي احترافي لمتجرك الإلكتروني في ثوانٍ.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Input Form Section */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-white border-b-2 border-cyan-500 pb-3">تفاصيل المنتج</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputGroup id="productName" label="اسم المنتج" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="مثال: ساعة ذكية رياضية" required />
              <InputGroup id="category" label="الفئة" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="مثال: إلكترونيات، أزياء" required />
              <InputGroup id="price" label="السعر التقريبي" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="مثال: 350 ريال سعودي" />
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">وصف بسيط أو ملاحظة</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: مقاومة للماء، بطارية تدوم طويلاً"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? <LoadingSpinner /> : '🚀 توليد المحتوى'}
              </button>
            </form>
          </div>

          {/* Output Section */}
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 min-h-[400px] flex flex-col">
             <h2 className="text-2xl font-bold mb-6 text-white border-b-2 border-cyan-500 pb-3">المحتوى المُولَّد</h2>
            <div className="flex-grow flex items-center justify-center">
              {isLoading && <LoadingSpinner large={true} />}
              {error && <p className="text-red-400 text-center">{error}</p>}
              {!isLoading && !error && !generatedContent && (
                <p className="text-slate-500 text-center">سيظهر المحتوى هنا بعد إدخال تفاصيل المنتج.</p>
              )}
              {generatedContent && (
                <div className="w-full space-y-4 animate-fade-in">
                  <OutputCard title="الوصف التسويقي" content={generatedContent.productDescription} />
                  <OutputCard title="منشور للسوشيال ميديا" content={generatedContent.socialMediaPost} />
                  <OutputCard title="عنوان إعلاني" content={generatedContent.adHeadline} />
                  <OutputCard title="نقاط البيع الفريدة" content={generatedContent.uniqueSellingPoints} />
                  <OutputCard title="هاشتاغات" content={generatedContent.hashtags} />
                </div>
              )}
            </div>
          </div>
        </div>
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>مدعوم بواسطة Gemini API</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
