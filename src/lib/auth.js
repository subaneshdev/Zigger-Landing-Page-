import crypto from 'crypto';

/**
 * Hashes a plaintext password using SHA-256 with salt.
 */
export function hashPassword(password) {
  if (!password) return '';
  const salt = 'ziggers_partner_salt_2026';
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

/**
 * Compares plaintext password with stored hash.
 */
export function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  const hash = hashPassword(password);
  return hash === storedHash;
}

/**
 * Creates a base64 session token for partner session.
 */
export function createPartnerToken(email, uniqueCode) {
  const payload = JSON.stringify({
    email,
    code: uniqueCode,
    iat: Date.now()
  });
  return Buffer.from(payload).toString('base64');
}

/**
 * Decodes partner session token.
 */
export function parsePartnerToken(token) {
  try {
    if (!token) return null;
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (err) {
    return null;
  }
}
