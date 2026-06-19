import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from './env';

const JWT_SECRET = env.JWT_SECRET;
// Deriving a 32-byte key from whatever string is provided in env to guarantee valid key length
const ENCRYPTION_KEY = crypto.createHash('sha256').update(env.ENCRYPTION_KEY).digest();

export function generateEncryptedToken(payload: any): string {
  // Sign JWT
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
  // Encrypt the signed JWT string using AES-256-CBC
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptToken(encryptedToken: string): any {
  try {
    const [ivHex, encrypted] = encryptedToken.split(':');
    if (!ivHex || !encrypted) return null;
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    // Verify and decode JWT
    return jwt.verify(decrypted, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
