import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'retro-monk-archival-studio-secret-key-12345';

// Helper to base64url encode
function base64url(source: Buffer | string): string {
  const buf = Buffer.isBuffer(source) ? source : Buffer.from(source);
  return buf.toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Helper to base64url decode
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

export function signToken(payload: any, expirySeconds: number = 28800): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expirySeconds
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  const encodedSignature = base64url(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export function verifyToken(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const computedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest();

    const encodedComputedSignature = base64url(computedSignature);

    if (signature !== encodedComputedSignature) {
      return null; // Signature mismatch
    }

    const decodedPayload = JSON.parse(base64urlDecode(payload));
    const now = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp && now > decodedPayload.exp) {
      return null; // Token expired
    }

    return decodedPayload;
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
