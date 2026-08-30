'use server';

import { decodeToken } from '@/app/utils';
import type { Cart } from '@/api/services/types';

const V2_BASE_URL = 'https://ecommerce.routemisr.com/api/v2';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T | undefined> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      return undefined;
    }

    const data = await res.json();
    return data.data ?? data;
  } catch (error) {
    console.log('error', error);
    return undefined;
  }
}

export async function getCheckoutCart(): Promise<Cart | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Cart>(`${V2_BASE_URL}/cart`, {
    headers: { token },
  });
}
