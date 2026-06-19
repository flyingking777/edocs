'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Run seeding on load to ensure database is ready
  useEffect(() => {
    fetch('/api/seed', { method: 'POST' }).catch(err => console.error('Seeding failed:', err));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Clear mock cookies if any, then redirect
        router.push('/');
      } else {
        setError(data.error || 'Invalid credentials or connection error.');
      }
    } catch (err) {
      setError('A connection error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background digital grid and radial glow */}
      <div style={styles.gridOverlay} />
      <div style={styles.glow} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={styles.card}
      >
        <div style={styles.header}>
          <div style={styles.logoBadge} aria-label="MUJHU eDocs">
            {/* MUJHU brand mark: green leaf swoosh + coral drop */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M4 22 C 4 11, 13 4, 24 4 C 24 15, 17 22, 4 22 Z" fill="#00A651" />
              <circle cx="23" cy="23" r="4.5" fill="#2563EB" />
            </svg>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleAccent}>Multichoice</span>
          </h1>
          <p style={styles.subtitle}>Enterprise-grade asset management & secure login</p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={styles.errorBox}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '6px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL ADDRESS</label>
            <input 
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                style={{ ...styles.input, paddingRight: '44px', width: '100%', boxSizing: 'border-box' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !email || !password}
            style={{
              ...styles.submitButton,
              ...(isLoading || !email || !password ? styles.disabledButton : {})
            }}
          >
            {isLoading ? (
              <span style={styles.spinner} />
            ) : (
              'Authenticate Securely'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    color: '#0f172a',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    padding: '24px'
  },
  gridOverlay: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(15, 23, 42, 0.05) 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
    pointerEvents: 'none' as const,
    opacity: 0.6
  },
  glow: {
    position: 'absolute' as const,
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 166, 81, 0.18) 0%, rgba(37, 99, 235, 0.14) 45%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none' as const
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    zIndex: 10,
    position: 'relative' as const
  },
  header: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: '32px',
    textAlign: 'center' as const
  },
  logoBadge: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, rgba(0, 166, 81, 0.14) 0%, rgba(37, 99, 235, 0.12) 100%)',
    border: '1px solid rgba(0, 166, 81, 0.28)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    boxShadow: '0 6px 18px rgba(0, 166, 81, 0.18)'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    margin: 0,
    color: '#0f172a'
  },
  titleAccent: {
    color: '#00A651',
    background: 'linear-gradient(135deg, #34D27A 0%, #00A651 45%, #2563EB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '8px',
    marginBottom: 0
  },
  errorBox: {
    background: 'rgba(220, 38, 38, 0.08)',
    border: '1px solid rgba(220, 38, 38, 0.25)',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '0.85rem',
    color: '#b91c1c',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  },
  label: {
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.075em',
    color: '#64748b'
  },
  input: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '0.95rem',
    color: '#0f172a',
    transition: 'all 0.2s',
    outline: 'none'
  },
  eyeButton: {
    position: 'absolute' as const,
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#94a3b8'
  },
  submitButton: {
    background: 'linear-gradient(135deg, #00A651 0%, #006837 100%)',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    boxShadow: '0 4px 12px rgba(0, 166, 81, 0.30)'
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  }
};
