'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

/* =============================================================================
🛑 DISABLED: This function is commented out because the backend does not use Refresh Tokens.
=============================================================================
export const getNewToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const user = cookieStore.get('user')?.value as any;

  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  if (!refreshToken) return null;
  let data;
  if (user) {
    data = {
      userId: user.id as string,
      refreshToken,
    };
    console.log('User Inside New token======>', user);
  }

  try {
    const res = await fetch(`${baseApi}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Refresh Token Error:', error);
    return null;
  }
};
*/

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 - 60000 < Date.now();
  } catch {
    return true;
  }
};

export const getValidToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // Modified logic to handle Access Token only
  if (!token || (await isTokenExpired(token))) {
    console.log('Token expired or missing. No refresh token available.');

    /* =============================================================================
    🛑 DISABLED: Refresh flow disabled due to backend single-token architecture
    =============================================================================
    const res = await getNewToken();
    console.log('Res Inside GeT NEW TOKEN======>', res);

    if (res?.data?.accessToken) {
      token = res.data.accessToken;
      cookieStore.set('accessToken', token as string);
      if (res.data.refreshToken) {
        cookieStore.set('refreshToken', res.data.refreshToken as string);
      }
      return token!;
    } else {
      return null;
    }
    */

    // If token is missing or expired, clear it and return null
    if (token) {
      try {
        cookieStore.delete('accessToken');
      } catch (e) {
        console.error('Failed to clear expired token:', e);
      }
    }
    return null;
  }

  return token;
};
