'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ToastKind = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  durationMs: number;
}

interface ToastContextValue {
  push: (kind: ToastKind, message: string, durationMs?: number) => void;
  success: (message: string, durationMs?: number) => void;
  error: (message: string, durationMs?: number) => void;
  info: (message: string, durationMs?: number) => void;
  warning: (message: string, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const PALETTE: Record<ToastKind, { bg: string; border: string; color: string; accent: string }> = {
  success: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.45)', color: '#10b981', accent: '#10b981' },
  error:   { bg: 'rgba(220, 38, 38, 0.10)',  border: 'rgba(220, 38, 38, 0.45)',  color: '#DC2626', accent: '#DC2626' },
  info:    { bg: 'rgba(37, 99, 235, 0.10)',  border: 'rgba(37, 99, 235, 0.40)',  color: '#2563EB', accent: '#2563EB' },
  warning: { bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.45)', color: '#fbbf24', accent: '#fbbf24' }
};

let idCounter = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string, durationMs = 4500) => {
      const id = idCounter++;
      setToasts(prev => [...prev, { id, kind, message, durationMs }]);
      if (durationMs > 0) {
        setTimeout(() => dismiss(id), durationMs);
      }
    },
    [dismiss]
  );

  const value: ToastContextValue = {
    push,
    success: (m, d) => push('success', m, d),
    error: (m, d) => push('error', m, d),
    info: (m, d) => push('info', m, d),
    warning: (m, d) => push('warning', m, d)
  };

  // Expose a window-level helper so non-React code (older callbacks, audit logs)
  // can still emit toasts without prop-drilling.
  useEffect(() => {
    (window as any).__toast = value;
    return () => {
      if ((window as any).__toast === value) delete (window as any).__toast;
    };
  }, [value]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 9999,
          maxWidth: '380px'
        }}
      >
        {toasts.map(t => {
          const palette = PALETTE[t.kind];
          return (
            <div
              key={t.id}
              role="status"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                border: `1px solid ${palette.border}`,
                borderLeft: `4px solid ${palette.accent}`,
                color: '#0f172a',
                padding: '12px 14px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                animation: 'edocsToastIn 180ms ease-out'
              }}
            >
              <span style={{ color: palette.color, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.06em' }}>
                {t.kind}
              </span>
              <span style={{ flex: 1 }}>{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  lineHeight: 1
                }}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes edocsToastIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Soft fallback: still log to console so callers don't crash if used
    // outside the provider (e.g. server-rendered errors).
    return {
      push: (_k: ToastKind, m: string) => console.warn('[toast(no-provider)]', m),
      success: (m: string) => console.warn('[toast(no-provider)]', m),
      error: (m: string) => console.warn('[toast(no-provider)]', m),
      info: (m: string) => console.warn('[toast(no-provider)]', m),
      warning: (m: string) => console.warn('[toast(no-provider)]', m)
    } as ToastContextValue;
  }
  return ctx;
}

/**
 * Imperative helper for legacy/non-React callbacks.
 * Falls back to `alert()` if the provider hasn't mounted yet.
 */
export function notify(kind: ToastKind, message: string) {
  if (typeof window !== 'undefined' && (window as any).__toast) {
    (window as any).__toast.push(kind, message);
  } else if (typeof window !== 'undefined') {
    window.alert(message);
  }
}
