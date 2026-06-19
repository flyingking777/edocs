/**
 * Centralized environment validation.
 *
 * Required secrets MUST be set in production. We refuse to start the server
 * (and refuse to mint/verify sessions) if they're missing.
 *
 * In development we allow a clearly-marked default so contributors can run
 * `npm run dev` without manual setup, but we log a loud warning.
 */

const DEV_DEFAULTS = {
  JWT_SECRET: 'dev_only_jwt_secret_change_in_production_minimum_32_bytes_xxxxx',
  ENCRYPTION_KEY: 'dev_only_encryption_key_change_in_production_minimum_32_bytes_xxx'
};

const REQUIRED_KEYS = ['JWT_SECRET', 'ENCRYPTION_KEY'] as const;
type RequiredKey = (typeof REQUIRED_KEYS)[number];

function readSecret(name: RequiredKey): string {
  const value = process.env[name];
  if (value && value.length >= 32) return value;

  if (process.env.NODE_ENV === 'production') {
    // In production we ABSOLUTELY refuse to start with weak secrets.
    throw new Error(
      `[env] ${name} is missing or shorter than 32 characters. Refusing to start in production.`
    );
  }

  // Dev fallback (with a noisy warning so it can't be ignored).
  // eslint-disable-next-line no-console
  console.warn(
    `[env] ${name} is missing or too short — using an insecure development default. ` +
      `Set it to a long random string in your environment before deploying.`
  );
  return DEV_DEFAULTS[name];
}

export const env = {
  JWT_SECRET: readSecret('JWT_SECRET'),
  ENCRYPTION_KEY: readSecret('ENCRYPTION_KEY'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
  // Allow opting back in to impersonation/dev seed routes only when this is "1".
  ALLOW_DEV_ROUTES:
    process.env.NODE_ENV !== 'production' || process.env.ALLOW_DEV_ROUTES === '1'
};
