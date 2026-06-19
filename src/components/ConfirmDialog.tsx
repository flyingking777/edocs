'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ConfirmTone = 'default' | 'warning' | 'danger';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
}

type Resolver = (value: boolean) => void;

interface DialogState {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: ConfirmTone;
}

const INITIAL: DialogState = {
  open: false,
  title: 'Please confirm',
  message: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  tone: 'default'
};

const ConfirmContext = createContext<((opts: ConfirmOptions) => Promise<boolean>) | null>(null);

const TONE_STYLES: Record<ConfirmTone, {
  iconBg: string;
  iconColor: string;
  btn: string;
  ring: string;
}> = {
  default: {
    iconBg: 'rgba(37, 99, 235, 0.12)',
    iconColor: '#2563EB',
    btn: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    ring: 'rgba(37, 99, 235, 0.30)'
  },
  warning: {
    iconBg: 'rgba(245, 158, 11, 0.16)',
    iconColor: '#B45309',
    btn: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    ring: 'rgba(245, 158, 11, 0.30)'
  },
  danger: {
    iconBg: 'rgba(220, 38, 38, 0.12)',
    iconColor: '#DC2626',
    btn: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
    ring: 'rgba(220, 38, 38, 0.30)'
  }
};

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DialogState>(INITIAL);
  const resolverRef = useRef<Resolver | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setState({
        open: true,
        title: opts.title ?? 'Please confirm',
        message: opts.message,
        confirmLabel: opts.confirmLabel ?? 'Confirm',
        cancelLabel: opts.cancelLabel ?? 'Cancel',
        tone: opts.tone ?? 'default'
      });
    });
  }, []);

  const close = useCallback((value: boolean) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setState((s) => ({ ...s, open: false }));
  }, []);

  // Expose a window-level helper so plain (non-context-aware) code can call it.
  useEffect(() => {
    (window as any).__confirmDialog = confirm;
    return () => {
      if ((window as any).__confirmDialog === confirm) {
        delete (window as any).__confirmDialog;
      }
    };
  }, [confirm]);

  // Keyboard: Escape -> cancel, Enter -> confirm
  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        close(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state.open, close]);

  const tone = TONE_STYLES[state.tone];

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            key="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close(false);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.45)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '24px',
              fontFamily: '"Inter", system-ui, -apple-system, sans-serif'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '440px',
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow:
                  '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.05)',
                color: '#0f172a'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  aria-hidden
                  style={{
                    width: '44px',
                    height: '44px',
                    flexShrink: 0,
                    borderRadius: '12px',
                    background: tone.iconBg,
                    color: tone.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    id="confirm-dialog-title"
                    style={{
                      margin: 0,
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#0f172a'
                    }}
                  >
                    {state.title}
                  </h3>
                  <p
                    id="confirm-dialog-message"
                    style={{
                      marginTop: '6px',
                      marginBottom: 0,
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      color: '#475569'
                    }}
                  >
                    {state.message}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '24px'
                }}
              >
                <button
                  type="button"
                  onClick={() => close(false)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    color: '#0f172a',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.15s, border-color 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                  }}
                >
                  {state.cancelLabel}
                </button>
                <button
                  type="button"
                  autoFocus
                  onClick={() => close(true)}
                  style={{
                    background: tone.btn,
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: `0 4px 12px ${tone.ring}`,
                    transition: 'transform 0.1s'
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                  }}
                >
                  {state.confirmLabel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    return async (opts: ConfirmOptions) =>
      typeof window !== 'undefined' ? window.confirm(opts.message) : false;
  }
  return ctx;
}

/**
 * Imperative helper - works anywhere once <ConfirmProvider> is mounted.
 * Falls back to native window.confirm if the provider hasn't mounted yet.
 */
export function confirmDialog(opts: ConfirmOptions): Promise<boolean> {
  if (typeof window !== 'undefined' && (window as any).__confirmDialog) {
    return (window as any).__confirmDialog(opts) as Promise<boolean>;
  }
  if (typeof window !== 'undefined') {
    return Promise.resolve(window.confirm(opts.message));
  }
  return Promise.resolve(false);
}
