import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'eclavin_admin_token';

/**
 * With ADMIN_PASSWORD unset, the old check compared undefined === undefined and
 * let every visitor without a cookie into /admin. No password configured now
 * means nobody gets in.
 */
export async function isAdmin() {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME);
  return typeof token?.value === 'string' && token.value === expected;
}

export async function setAdminSession(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (expected && password === expected) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return true;
  }
  return false;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
