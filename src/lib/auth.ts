import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'eclavin_admin_token';

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME);
  return token?.value === process.env.ADMIN_PASSWORD;
}

export async function setAdminSession(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
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
