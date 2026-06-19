import { ToastProvider } from '@/components/Toaster';
import { ConfirmProvider } from '@/components/ConfirmDialog';

export const metadata = {
  title: 'eDocs Management Center',
  description: 'Enterprise Secure Document Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: 'Inter', system-ui, sans-serif; 
            background: #ffffff; 
            color: #0f172a; 
            overflow: hidden;
            height: 100vh;
          }
          button { cursor: pointer; border: none; outline: none; transition: all 0.2s; }
          input { outline: none; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
          button svg { pointer-events: none; }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      {/*
        `suppressHydrationWarning` on <body> silences the React 19 hydration
        mismatch caused by browser extensions (Grammarly, LastPass, ColorZilla,
        etc.) injecting attributes like `data-new-gr-c-s-check-loaded` before
        hydration runs. The warning only suppresses *attribute* diffs on this
        single element — real markup mismatches inside the body are still
        reported.
      */}
      <body suppressHydrationWarning>
        <ToastProvider>
          <ConfirmProvider>{children}</ConfirmProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
