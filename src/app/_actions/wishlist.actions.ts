'use server';

import { decodeToken } from '@/app/utils';

export async function getWishlist(): Promise<string[]> {
  const token = await decodeToken();
  if (!token) return [];

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    headers: { token },
    cache: 'no-store',
  });

  if (!res.ok) return [];

  const data = await res.json();
  // data.data is an array of product objects; we only need their ids
  return (data?.data ?? []).map((product: { _id: string }) => product._id);
}

export async function addToWishlist(productId: string): Promise<boolean> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method: 'post',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  return res.ok;
}

export async function removeFromWishlist(productId: string): Promise<boolean> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: 'delete',
    headers: { token },
  });

  return res.ok;
}