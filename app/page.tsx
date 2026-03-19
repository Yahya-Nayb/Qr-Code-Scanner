'use client';

import { useState } from 'react';
import { QrScanner } from '@/components/QrScanner';

export default function Home() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (scannedResult) {
      await navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenLink = () => {
    if (!scannedResult) return;
    const cleanResult = scannedResult.trim();
    const isUrl = cleanResult.startsWith('http') || cleanResult.includes('.');
    if (isUrl) {
      const url = cleanResult.startsWith('http') ? cleanResult : `https://${cleanResult}`;
      window.location.assign(url);
    }
  };

  const isUrl = scannedResult?.startsWith('http');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Ge</span>
              <span className="text-white">Scanner</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#666]">
                v1.0 - <span className="text-purple-400">AI Powered</span>
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#999]">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-tighter">
              Secure Browser-Based
            </span>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-12">
        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Container */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col h-[500px] lg:h-[600px]">
            <div className="flex items-center space-x-2 mb-6 text-[#999999]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium uppercase tracking-wider">Camera</span>
            </div>
            
            <div className="flex-1 bg-black rounded-xl overflow-hidden relative">
              <QrScanner onResult={setScannedResult} />
            </div>
          </div>

          {/* Results Container */}
          <div id="results-container" className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col h-[500px] lg:h-[600px]">
            <div className="flex items-center space-x-2 mb-6 text-[#999999]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-sm font-medium uppercase tracking-wider">Results</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              {!scannedResult ? (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <path d="M40,140 Q60,120 100,130" stroke="#333" strokeDasharray="4,4" fill="none" />
                      <path d="M160,150 Q140,130 100,140" stroke="#333" strokeDasharray="4,4" fill="none" />
                      <path d="M100,60 L150,85 L150,135 L100,160 L50,135 L50,85 Z" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
                      <path d="M100,60 L150,85 L100,110 L50,85 Z" fill="#222" stroke="#333" strokeWidth="2" />
                      <path d="M100,110 L150,85 L150,135 L100,160 Z" fill="#161616" stroke="#333" strokeWidth="2" />
                      <path d="M50,85 L30,65 L80,40 L100,60 Z" fill="#262626" stroke="#333" strokeWidth="1" />
                      <path d="M150,85 L170,65 L120,40 L100,60 Z" fill="#262626" stroke="#333" strokeWidth="1" />
                      <g transform="translate(100, 30) scale(0.8)">
                        <circle cx="0" cy="0" r="2" fill="#e01a4f" />
                        <path d="M-4,-2 L-8,-6" stroke="#e01a4f" strokeWidth="1" />
                        <path d="M4,-2 L8,-6" stroke="#e01a4f" strokeWidth="1" />
                      </g>
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Nothing scanned so far!</h3>
                  <p className="text-[#666666] max-w-[250px] mx-auto">
                    Scan a code to see the results here.
                  </p>
                </div>
              ) : (
                <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#666666] text-xs font-bold uppercase tracking-widest">Scanned Content</span>
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase tracking-tighter">Success</span>
                    </div>
                    <div className="text-white font-mono break-all text-lg leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                      {scannedResult}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {isUrl && (
                      <button
                        onClick={handleOpenLink}
                        className="w-full cursor-pointer py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open Link
                      </button>
                    )}
                    <button
                      onClick={handleCopy}
                      className={`w-full cursor-pointer py-4 ${isUrl ? 'bg-[#262626] hover:bg-[#333]' : 'bg-emerald-500 hover:bg-emerald-600'} text-white rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
                    </button>
                  </div>

                  <p className="text-center text-[#444] text-[10px] font-medium uppercase tracking-[0.2em]">
                    Ready for next scan
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="max-w-6xl mx-auto mt-12 p-8 md:p-12 bg-[#141414]/50 border border-[#262626] rounded-[2.5rem] text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* English SEO Content */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Online QR Scanner & No-install QR Reader
              </h2>
              <p className="leading-relaxed text-gray-400">
                Welcome to GeScanner, the ultimate Online QR Scanner and No-install QR Reader. Our tool provides a lightning-fast, secure way to scan URLs and text directly from your browser. Whether you need to Scan from Image files or use your live camera, GeScanner ensures 100% privacy with client-side processing.
              </p>
              <ul className="space-y-3">
                {[
                  "Instant Browser-based Scanning",
                  "Secure Client-side Processing",
                  "Support for Camera and Image Upload",
                  "Privacy Focused - No Data Sent to Server"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Arabic SEO Content */}
            <div className="space-y-6 text-right" dir="rtl">
              <h2 className="text-2xl font-bold text-white tracking-tight font-sans">
                قارئ رموز QR أونلاين وبدون تثبيت تطبيقات
              </h2>
              <p className="leading-relaxed text-gray-400">
                مرحباً بكم في GeScanner، الخيار الأفضل لـ قراءة رموز QR أونلاين بدون تثبيت تطبيقات. توفر أداتنا طريقة فائقة السرعة وآمنة لمسح الروابط والنصوص مباشرة من متصفحك. سواء كنت بحاجة لـ المسح من الصور المخزنة أو استخدام الكاميرا الحية، يضمن GeScanner خصوصية تامة حيث تتم جميع العمليات محلياً على جهازك.
              </p>
              <ul className="space-y-3">
                {[
                  "مسح فوري عبر المتصفح",
                  "معالجة آمنة محلياً على جهازك",
                  "دعم الكاميرا ورفع ملفات الصور",
                  "تركيز على الخصوصية - لا يتم إرسال بيانات للسيرفر"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-12 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-lg font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Ge</span>
              <span className="text-white">Scanner</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          
          <div className="h-px w-12 bg-white/10" />
          
          <p className="text-[#666] text-[10px] uppercase tracking-widest text-center">
            Privacy-First: <span className="text-emerald-500/80">No data ever leaves your browser.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
