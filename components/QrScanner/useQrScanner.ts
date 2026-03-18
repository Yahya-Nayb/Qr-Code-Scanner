'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseQrScannerProps {
  elementId: string;
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (errorMessage: string) => void;
  fps?: number;
  qrbox?: number | { width: number; height: number };
}

export type ScannerStatus = 'idle' | 'scanning' | 'permission-denied' | 'error' | 'stopped';

export function useQrScanner({
  elementId,
  onScanSuccess,
  onScanError,
  fps = 10,
  qrbox = 250,
}: UseQrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isTransitioningRef = useRef(false);
  
  const successCallbackRef = useRef(onScanSuccess);
  const errorCallbackRef = useRef(onScanError);

  const [status, setStatus] = useState<ScannerStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    successCallbackRef.current = onScanSuccess;
    errorCallbackRef.current = onScanError;
  }, [onScanSuccess, onScanError]);

  const stopScanner = useCallback(async () => {
    if (isTransitioningRef.current) return;
    
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        isTransitioningRef.current = true;
        await scannerRef.current.stop();
        scannerRef.current.clear();
        setStatus('stopped');
      } catch (err) {
        console.error('Failed to stop scanner:', err);
      } finally {
        isTransitioningRef.current = false;
      }
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (isTransitioningRef.current) return;

    try {
      setIsInitializing(true);
      isTransitioningRef.current = true;
      setStatus('scanning');
      setErrorMessage(null);
      setError(null);
      setHasPermissionError(false);

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      if (scannerRef.current.isScanning) return;

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps,
          qrbox,
        },
        (decodedText) => {
          successCallbackRef.current(decodedText);
        },
        (errorMessage) => {
          if (errorCallbackRef.current) errorCallbackRef.current(errorMessage);
        }
      );
    } catch (err: unknown) {
      console.error('Scanner start error:', err);
      
      const errorStr = typeof err === 'string' ? err : (err as Error)?.message || '';
      const errorName = (err as Error)?.name || '';

      if (errorName === 'NotAllowedError' || errorStr.toLowerCase().includes('permission denied')) {
        setHasPermissionError(true);
        setError('Camera permission denied. Please enable it in your browser settings.');
        setErrorMessage('Camera access is required to scan codes');
        setStatus('permission-denied');
      } else {
        setError(errorStr || 'Failed to start camera.');
        setErrorMessage(errorStr || 'Failed to start camera.');
        setStatus('error');
      }
    } finally {
      setIsInitializing(false);
      isTransitioningRef.current = false;
    }
  }, [elementId, fps, qrbox]);

  const resetScanner = useCallback(async () => {
    setHasPermissionError(false);
    setError(null);
    setErrorMessage(null);
    setStatus('idle');
    // Manual restart required after reset
  }, []);

  useEffect(() => {
    return () => {
      (async () => {
        await stopScanner();
      })();
    };
  }, [stopScanner]);

  return {
    startScanner,
    stopScanner,
    resetScanner,
    status,
    errorMessage,
    error,
    hasPermissionError,
    isInitializing,
  };
}
