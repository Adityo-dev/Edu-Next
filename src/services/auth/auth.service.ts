'use server';

import { TUserListItem } from '@/types/userRole.types';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';
import { baseApi } from '../root/baseApi';

//Forget Password
export const forgetPassword = async (data: FieldValues) => {
  const result = await baseApi('/auth/forgot-password', {
    method: 'POST',
    data: data,
  });
  return result;
};
export const resetPassword = async (data: FieldValues) => {
  const result = await baseApi(`/auth/reset-password`, {
    method: 'POST',
    data: data,
  });
  return result;
};

//Update Temporary Password
export const updateTemporaryPassword = async (data: FieldValues) => {
  const result = await baseApi('/auth/update-password', {
    method: 'POST',
    data: data,
  });
  return result;
};

//Gwt Access Token using Refresh Token
export const refreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const result = await baseApi('/auth/refresh', {
    method: 'POST',
    data: { refreshToken },
  });
  if (result?.success) {
    cookieStore.set('accessToken', result?.data?.accessToken);
  }
  console.log('verify refresh', result);
  return result;
};

//Get Current User
export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userCookie = cookieStore.get('user')?.value;

  if (accessToken && userCookie) {
    try {
      const user = JSON.parse(userCookie);
      return { ...user, accessToken };
    } catch (err) {
      console.error('Error parsing user cookie:', err);
      return null;
    }
  }

  return null;
};

//Logout user
export const logoutUser = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete('accessToken');
  cookiesStore.delete('refreshToken');
  cookiesStore.delete('user');
};

export const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken);
};
export const setUserProfile = async (user: TUserListItem, token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', token);
  cookieStore.set('user', JSON.stringify(user));
  // cookieStore.set("refreshToken", tokens?.refreshToken);
};
export const updateUserProfile = async (user: TUserListItem) => {
  const cookieStore = await cookies();
  cookieStore.set('user', JSON.stringify(user));
};
