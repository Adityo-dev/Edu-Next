/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { updateTag } from 'next/cache';

// import { redirect } from "next/navigation";
import { getValidToken } from '../handleToken';

type TRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  data?: any;
  requiresAuth?: boolean;
  tags?: string[];
  revalidateTag?: string[];
  revalidate?: number | false;
  params?: Record<string, string | number | string[] | undefined>;
};

export const baseApi = async (endpoint: string, options: TRequestOptions = {}): Promise<any> => {
  const {
    method = 'GET',
    data,
    requiresAuth = undefined,
    tags = [],
    revalidateTag = [],
    revalidate = false,
    params,
  } = options;

  // 1. URL Construction
  // const url = new URL(`http://13.61.97.158:5000${endpoint}`);
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            url.searchParams.append(key, val.toString());
          });
        } else {
          url.searchParams.append(key, value.toString());
        }
      }
    });
  }

  // 2. Header Setup
  const headers = new Headers();

  if (requiresAuth) {
    const token = await getValidToken();
    if (!token) {
      console.log('No valid token available for authenticated request');
      return {
        success: false,
        statusCode: 401,
        data: { message: 'User not authenticated' },
      };
    }
    headers.append('Authorization', `Bearer ${token}`);
  }

  // 3. Body Handling (JSON vs FormData)
  let body: any = undefined;
  if (data) {
    if (data instanceof FormData) {
      body = data; // Browser sets Content-Type automatically
    } else {
      headers.append('Content-Type', 'application/json');
      body = JSON.stringify(data);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      method,
      headers,
      credentials: 'include',
      body,
      next: {
        ...(tags.length > 0 && { tags }),
        ...(revalidate !== false && { revalidate }),
      },
    });

    // 4. Global Response Interceptor Logic
    // if (res.status === 401) {
    //   // Logic for Unauthorized (e.g., redirect to login)
    //   redirect("/login");
    // }
    const result = await res.json();

    // Handle Success
    if (method !== 'GET' && revalidateTag.length > 0) {
      revalidateTag.forEach((tag) => updateTag(tag));
    }

    // return {
    //   success: true,
    //   statusCode: res.status,
    //   message: result.message || "Operation successful",
    //   data: result,
    // };

    return result;
  } catch (error: any) {
    // Log error for debugging but re-throw so the UI can handle it
    console.log(`[apiClient Error] ${method} ${endpoint}:`, error.message);
    throw error;
  }
};
