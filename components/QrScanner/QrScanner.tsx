'use client';

import React, { useState } from 'react';
import { useQrScanner } from './useQrScanner';

interface QrScannerProps {
  onResult: (result: string) => void;
}

const ELEMENT_ID = 'qr-reader-container';

export const QrScanner: React.FC<QrScannerProps> = ({ onResult }) => {
  const [hasScanned, setHasScanned] = useState(false);

  const { 
    startScanner, 
    stopScanner, 
    resetScanner,
    status, 
    errorMessage, 
    error,
    hasPermissionError,
    isInitializing
  } = useQrScanner({
    elementId: ELEMENT_ID,
    onScanSuccess: (decodedText) => {
      onResult(decodedText);
      setHasScanned(true);
      stopScanner();
    },
    qrbox: { width: 250, height: 250 },
  });

  const handleScanAgain = () => {
    setHasScanned(false);
    resetScanner();
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-black">
      {/* The video container for html5-qrcode */}
      <div 
        id={ELEMENT_ID} 
        className={`w-full h-full bg-black ${
          (status === 'idle' || hasPermissionError || error || hasScanned) ? 'hidden' : 'block'
        }`} 
      />

      {/* Manual Start / Placeholder View */}
      {status === 'idle' && !isInitializing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#141414]">
          <div className="w-20 h-20 bg-[#262626] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <button
            onClick={startScanner}
            className="px-10 py-4 bg-[#e01a4f] hover:bg-[#c41644] text-white rounded-2xl font-bold transition-all shadow-xl shadow-[#e01a4f]/20 transform hover:scale-105"
          >
            Start Scanner
          </button>
        </div>
      )}

      {/* Loading State / Spinner */}
      {isInitializing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <div className="w-12 h-12 border-4 border-[#e01a4f]/30 border-t-[#e01a4f] rounded-full animate-spin mb-4" />
          <p className="text-[#e01a4f] font-semibold text-sm animate-pulse">Initializing Camera...</p>
        </div>
      )}

      {/* Viewfinder Overlay */}
      {status === 'scanning' && !hasPermissionError && !error && !isInitializing && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-[250px] h-[250px] border border-white/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 border-2 border-white/5 shadow-[0_0_0_1000px_rgba(0,0,0,0.4)]" />
            {/* Animated Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#e01a4f] shadow-[0_0_15px_#e01a4f] animate-scan-line" />
          </div>
        </div>
      )}

      {/* Permission/Error State */}
      {(hasPermissionError || status === 'error') && !isInitializing && (
        <div className="absolute inset-0 bg-[#141414] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-[#e01a4f]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#e01a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Camera Error</h3>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 max-w-[280px]">
            <p className="text-red-400 text-sm leading-relaxed">
              {error || errorMessage || 'Failed to start camera.'}
            </p>
          </div>
          <button
            onClick={startScanner}
            className="px-8 py-3 bg-[#e01a4f] hover:bg-[#c41644] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#e01a4f]/20 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      )}

      {/* "Scan Again" Overlay (Post-Success) */}
      {hasScanned && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={handleScanAgain}
            className="flex items-center space-x-3 bg-[#e01a4f] hover:bg-[#c41644] text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#e01a4f]/30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-lg">Scan again</span>
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(250px); }
        }
        .animate-scan-line {
          animation: scan-line 2.5s ease-in-out infinite;
        }
        #qr-reader-container video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
        #qr-reader-container div {
          display: none;
        }
        #qr-reader-container video {
          display: block !important;
        }
      `}</style>
    </div>
  );
};
