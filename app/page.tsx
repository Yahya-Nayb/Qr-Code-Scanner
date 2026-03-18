'use client';

import { useState } from 'react';
import { QrScanner } from '@/components/QrScanner';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'camera' | 'image'>('camera');
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-12 font-sans">
      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex space-x-8 border-b border-[#262626]">
          <button
            onClick={() => setActiveTab('camera')}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === 'camera'
                ? 'text-[#e01a4f]'
                : 'text-[#666666] hover:text-gray-400'
            }`}
          >
            Scan with camera
            {activeTab === 'camera' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e01a4f] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === 'image'
                ? 'text-[#e01a4f]'
                : 'text-[#666666] hover:text-gray-400'
            }`}
          >
            Scan from image
            {activeTab === 'image' && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e01a4f] rounded-t-full" />
            )}
          </button>
        </div>
      </div>

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
            {activeTab === 'camera' ? (
              <QrScanner onResult={setScannedResult} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#666666]">
                Image upload placeholder
              </div>
            )}
          </div>
        </div>

        {/* Results Container */}
        <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col h-[500px] lg:h-[600px]">
          <div className="flex items-center space-x-2 mb-6 text-[#999999]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-sm font-medium uppercase tracking-wider">Results</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            {!scannedResult ? (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                {/* 3D Isomorphic Empty Box SVG */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Dotted Trails */}
                    <path d="M40,140 Q60,120 100,130" stroke="#333" strokeDasharray="4,4" fill="none" />
                    <path d="M160,150 Q140,130 100,140" stroke="#333" strokeDasharray="4,4" fill="none" />
                    
                    {/* The Box */}
                    <path d="M100,60 L150,85 L150,135 L100,160 L50,135 L50,85 Z" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
                    <path d="M100,60 L150,85 L100,110 L50,85 Z" fill="#222" stroke="#333" strokeWidth="2" />
                    <path d="M100,110 L150,85 L150,135 L100,160 Z" fill="#161616" stroke="#333" strokeWidth="2" />
                    
                    {/* Open Flaps */}
                    <path d="M50,85 L30,65 L80,40 L100,60 Z" fill="#262626" stroke="#333" strokeWidth="1" />
                    <path d="M150,85 L170,65 L120,40 L100,60 Z" fill="#262626" stroke="#333" strokeWidth="1" />
                    
                    {/* Small Fly */}
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
              <div className="w-full space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-6">
                  <div className="text-[#666666] text-xs font-bold uppercase mb-2">Scanned Data</div>
                  <div className="text-blue-400 font-mono break-all text-lg">{scannedResult}</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(scannedResult);
                  }}
                  className="w-full py-3 bg-[#262626] hover:bg-[#333] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy to clipboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
