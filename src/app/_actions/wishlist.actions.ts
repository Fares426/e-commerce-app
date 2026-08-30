'use server';

import { decodeToken } from '@/app/utils';

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
