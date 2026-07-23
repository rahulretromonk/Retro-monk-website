import { getAuthedUser } from './getAuthedUser';
import { verifyToken } from './jwt';

export async function checkAuth(req: Request): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return false;

  // 1. Check custom server-signed JWT
  const verified = verifyToken(token);
  if (verified) {
    return true;
  }

  // 2. Check Supabase JWT via getAuthedUser fallback
  try {
    const user = await getAuthedUser(req);
    return !!user;
  } catch (err) {
    console.error('Supabase fallback token check error:', err);
    return false;
  }
}
