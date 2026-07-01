import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Build a Content-Security-Policy that works with this app.
//
// Notes / trade-offs:
//   - `'unsafe-inline'` is unavoidable here because the app uses inline
//     `style={{...}}` props throughout (no nonce/hash pipeline wired in).
//     Removing it would require migrating every component to CSS modules.
//   - `script-src 'unsafe-inline'` is needed for Next.js hydration bootstrap
//     unless you opt in to script nonces (`experimental.nonce`). That's a
//     bigger change so it stays for now.
//   - `blob:` is allowed under `img-src` and `frame-src` because the upload
//     modal previews PDFs/images via `URL.createObjectURL()`.
//   - We keep the CSP in *report-only-ish* posture in development (we don't
//     ship it at all) so HMR / overlay / dev tools work without friction.
const cspDirectives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:"],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'"],
  "frame-src": ["'self'", "blob:"],
  "media-src": ["'self'", "blob:"],
  "worker-src": ["'self'", "blob:"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  "upgrade-insecure-requests": [],
};

const contentSecurityPolicy = Object.entries(cspDirectives)
  .map(([directive, values]) =>
    values.length ? `${directive} ${values.join(" ")}` : directive
  )
  .join("; ");

const securityHeaders = [
  // Don't leak referrers to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disallow MIME sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block being framed by other origins (clickjacking protection).
  { key: "X-Frame-Options", value: "DENY" },
  // Disable browser features we don't use.
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "interest-cohort=()",
    ].join(", "),
  },
  // Cross-origin isolation primitives.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // CSP applied in all environments (dev included is fine because we allow
  // unsafe-inline/unsafe-eval which Next dev tooling needs).
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

// HSTS is only meaningful (and only honored) over HTTPS, and we don't want
// to lock dev environments out, so we add it in production only.
if (isProd) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Pin Turbopack to this project root. Without this, Next.js may pick up a
  // parent package-lock.json (e.g. C:\Users\ekakooza\) and mis-resolve native
  // modules like better-sqlite3 — a common cause of dev-server hangs on Windows.
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    // The proxy (CSRF middleware) causes Next.js to buffer the entire request
    // body so it's available in both the proxy AND the route handler. The
    // default cap is 10 MB — anything larger gets truncated, which breaks
    // multipart/form-data parsing in the upload route. Match the upload limit.
    proxyClientMaxBodySize: '209715200', // 200 MB
  },
  async headers() {
    return [
      {
        // Apply security headers to every route, including API and static
        // assets, so a misconfigured page can't accidentally opt out.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
