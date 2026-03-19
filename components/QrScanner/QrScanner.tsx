'use client';

import React, { useState } from 'react';
import { useQrScanner } from './useQrScanner';

interface QrScannerProps {
  onResult: (result: string) => void;
}

const ELEMENT_ID = 'qr-reader-container';

export const QrScanner: React.FC<QrScannerProps> = ({ onResult }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { 
    startScanner, 
    stopScanner, 
    resetScanner,
    scanImage,
    status, 
    errorMessage, 
    error,
    hasPermissionError,
    isInitializing,
    isAnalyzingImage
  } = useQrScanner({
    elementId: ELEMENT_ID,
    onScanSuccess: (decodedText) => {
      // Haptic Feedback
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }

      setShowSuccess(true);
      onResult(decodedText);
      stopScanner();

      // Scroll to result (for mobile)
      setTimeout(() => {
        const resultsElement = document.getElementById('results-container');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }, 100);

      // Auto-hide success state after 1.5s to allow re-scanning
      setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
    },
    qrbox: { width: 250, height: 250 },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      scanImage(file);
    }
    // Reset input value so same file can be selected again
    e.target.value = '';
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-black">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* The video container for html5-qrcode */}
      <div 
        id={ELEMENT_ID} 
        className={`w-full h-full bg-black ${
          (status === 'idle' || status === 'stopped' || hasPermissionError || error) ? 'hidden' : 'block'
        }`} 
      />

      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-green-500/20 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce-short">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-4 text-white font-bold text-xl drop-shadow-md animate-pulse">Success!</p>
        </div>
      )}

      {/* Manual Start / Placeholder View */}
      {(status === 'idle' || status === 'stopped') && !isInitializing && !isAnalyzingImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#141414]">
          <div className="w-20 h-20 bg-[#262626] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <div className="flex flex-col w-full max-w-[240px] gap-3">
            <button
              onClick={startScanner}
              className="w-full px-10 cursor-pointer py-4 bg-[#e01a4f] hover:bg-[#c41644] text-white rounded-2xl font-bold transition-all shadow-xl shadow-[#e01a4f]/20 transform hover:scale-105"
            >
              Start Camera
            </button>
            
            <button
              onClick={triggerFileUpload}
              className="w-full px-10 py-4 cursor-pointer bg-[#262626] hover:bg-[#333333] text-white border border-white/10 rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Image
            </button>
          </div>
        </div>
      )}

      {/* Loading State / Spinner */}
      {(isInitializing || isAnalyzingImage) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <div className="w-12 h-12 border-4 border-[#e01a4f]/30 border-t-[#e01a4f] rounded-full animate-spin mb-4" />
          <p className="text-[#e01a4f] font-semibold text-sm animate-pulse">
            {isAnalyzingImage ? 'Analyzing Image...' : 'Initializing Camera...'}
          </p>
        </div>
      )}

      {/* Stop Button Overlay */}
      {status === 'scanning' && !isInitializing && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20 animate-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={stopScanner}
            className="group cursor-pointer flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-red-500/20 hover:border-red-500/40 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-2xl"
          >
            <div className="w-3 h-3 bg-red-500 rounded-sm group-hover:scale-110 transition-transform" />
            <span>Stop Scanner</span>
          </button>
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
          <div className="flex flex-col w-full max-w-[200px] gap-3">
            <button
              onClick={startScanner}
              className="px-8 py-3 cursor-pointer bg-[#e01a4f] hover:bg-[#c41644] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#e01a4f]/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry Camera
            </button>
            <button
              onClick={triggerFileUpload}
              className="px-8 py-3 cursor-pointer bg-[#262626] hover:bg-[#333333] text-white border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Try Image
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(250px); }
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-scan-line {
          animation: scan-line 2.5s ease-in-out infinite;
        }
        .animate-bounce-short {
          animation: bounce-short 0.5s ease-in-out 2;
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
