import { NextRequest, NextResponse } from 'next/server';

/**
 * CSRF defense via origin/referrer matching for state-changing requests.
 *
 * Same-site cookies (`lax`) already block most cross-site POSTs, but we
 * tighten this by refusing any mutating API call whose `Origin` (or fallback
 * `Referer`) doesn't match the request host. This also blocks classic
 * cross-origin form-based CSRF in browsers that ignore SameSite.
 *
 * Allowed: HEAD/GET/OPTIONS, plus mutating requests whose Origin == Host.
 * Allowed (dev): tools that send no Origin (curl, server-side) — we don't
 * want to break local scripts. In production we require an Origin header
 * on all mutating API calls.
 */

const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export const config = {
  // Only run on API routes. Static assets and pages don't need this check.
  matcher: ['/api/:path*']
};

export function proxy(req: NextRequest) {
  if (!MUTATING.has(req.method)) return NextResponse.next();

  const host = req.headers.get('host');
  const originHeader = req.headers.get('origin');
  const refererHeader = req.headers.get('referer');

  if (!host) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  let originHost: string | null = null;
  if (originHeader) {
    try {
      originHost = new URL(originHeader).host;
    } catch {
      return NextResponse.json({ error: 'Invalid Origin header' }, { status: 400 });
    }
  } else if (refererHeader) {
    try {
      originHost = new URL(refererHeader).host;
    } catch {
      // ignore
    }
  }

  // Production: missing Origin (and no usable Referer) is rejected.
  // Development: allow it so curl/Postman during local testing still works.
  if (!originHost) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Missing Origin header' }, { status: 403 });
    }
    return NextResponse.next();
  }

  if (originHost !== host) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}
