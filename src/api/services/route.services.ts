import { decodeSession, decodeToken } from '@/app/utils';
import {
  Address,
  BrandProps,
  Cart,
  Category,
  Order,
  Product,
  Review,
  ShippingAddress,
  SubCategory,
  User,
  WishlistItem,
} from './types';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';
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

export async function getAllProducts(): Promise<Product[] | undefined> {
  return fetchJson<Product[]>(`${BASE_URL}/products`);
}

export async function getSpecificProduct(id: string): Promise<Product | undefined> {
  return fetchJson<Product>(`${BASE_URL}/products/${id}`);
}

export async function getAllCategories(): Promise<Category[] | undefined> {
  return fetchJson<Category[]>(`${BASE_URL}/categories`);
}

export async function getSpecificCategory(id: string): Promise<Category | undefined> {
  return fetchJson<Category>(`${BASE_URL}/categories/${id}`);
}

export async function getSubCategoriesByCategory(categoryId: string): Promise<SubCategory[] | undefined> {
  return fetchJson<SubCategory[]>(`${BASE_URL}/categories/${categoryId}/subcategories`);
}

export async function getSpecificSubCategory(id: string): Promise<SubCategory | undefined> {
  return fetchJson<SubCategory>(`${BASE_URL}/subcategories/${id}`);
}

export async function getBrands(): Promise<BrandProps[]> {
  const res = await fetch(`${BASE_URL}/brands`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch brands');
  }

  const data = await res.json();
  return data.data as BrandProps[];
}

export async function getUserCart(): Promise<Cart | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Cart>(`${V2_BASE_URL}/cart`, {
    headers: { token },
  });
}

export async function applyCouponToCart(cartId: string, coupon: string): Promise<{ status: string; message?: string; data?: { totalCartPrice?: number } } | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<{ status: string; message?: string; data?: { totalCartPrice?: number } }>(`${V2_BASE_URL}/cart/${cartId}/coupon`, {
    method: 'put',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coupon }),
  });
}

export async function getAllUsers(): Promise<User[] | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<User[]>(`${BASE_URL}/users`, {
    headers: { token },
  });
}

export async function verifyToken(): Promise<{ status: string; message?: string } | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<{ status: string; message?: string }>(`${BASE_URL}/users/verifytoken`, {
    headers: { token },
  });
}

export async function forgotPassword(email: string): Promise<{ status: string; message?: string } | undefined> {
  return fetchJson<{ status: string; message?: string }>(`${BASE_URL}/auth/forgotPasswords`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export async function verifyResetCode(resetCode: string): Promise<{ status: string; message?: string } | undefined> {
  return fetchJson<{ status: string; message?: string }>(`${BASE_URL}/auth/verifyResetCode`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetCode }),
  });
}

export async function resetPassword(email: string, newPassword: string): Promise<{ status: string; message?: string } | undefined> {
  return fetchJson<{ status: string; message?: string }>(`${BASE_URL}/auth/resetPassword`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, newPassword }),
  });
}

export async function updateLoggedUserPassword(currentPassword: string, password: string, rePassword: string): Promise<{ status: string; message?: string } | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<{ status: string; message?: string }>(`${BASE_URL}/users/changeMyPassword`, {
    method: 'put',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentPassword, password, rePassword }),
  });
}

export async function updateLoggedUserData(data: { name?: string; phone?: string; email?: string }): Promise<User | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<User>(`${BASE_URL}/users/updateMe`, {
    method: 'put',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function getUserWishlist(): Promise<WishlistItem[] | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<WishlistItem[]>(`${BASE_URL}/wishlist`, {
    headers: { token },
  });
}

export async function addToWishlist(productId: string): Promise<boolean> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch(`${BASE_URL}/wishlist`, {
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

  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: 'delete',
    headers: { token },
  });

  return res.ok;
}

export async function getLoggedUserAddresses(): Promise<Address[] | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Address[]>(`${BASE_URL}/addresses`, {
    headers: { token },
  });
}

export async function getSpecificAddress(addressId: string): Promise<Address | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Address>(`${BASE_URL}/addresses/${addressId}`, {
    headers: { token },
  });
}

export async function addAddress(address: ShippingAddress): Promise<Address | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Address>(`${BASE_URL}/addresses`, {
    method: 'post',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shippingAddress: address }),
  });
}

export async function removeAddress(addressId: string): Promise<boolean> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch(`${BASE_URL}/addresses/${addressId}`, {
    method: 'delete',
    headers: { token },
  });

  return res.ok;
}
export async function getAllOrders(): Promise<Order[] | undefined> {
  const session = await decodeSession();
  if (!session) return undefined;

  return fetchJson<Order[]>(`${BASE_URL}/orders/user/${session.id}`, {
    headers: { token: session.token },
  });
}

export async function getSpecificOrder(orderId: string): Promise<Order | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Order>(`${BASE_URL}/orders/${orderId}`, {
    headers: { token },
  });
}

export async function getUserOrders(userId: string): Promise<Order[] | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Order[]>(`${BASE_URL}/orders/user/${userId}`, {
    headers: { token },
  });
}

export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress): Promise<boolean> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch(`${V2_BASE_URL}/orders/${cartId}`, {
    method: 'post',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shippingAddress }),
  });

  return res.ok;
}

export async function createCheckoutSession(cartId: string, shippingAddress: ShippingAddress, successUrl = 'http://localhost:3000'): Promise<string | false> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch(`${BASE_URL}/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`, {
    method: 'post',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shippingAddress }),
  });

  if (!res.ok) return false;

  const finalRes = await res.json();
  return finalRes.session?.url ?? false;
}

export async function getAllReviewsForProduct(productId: string): Promise<Review[] | undefined> {
  return fetchJson<Review[]>(`${BASE_URL}/products/${productId}/reviews`);
}

export async function getAllReviews(): Promise<Review[] | undefined> {
  return fetchJson<Review[]>(`${BASE_URL}/reviews`);
}

export async function getReviewById(reviewId: string): Promise<Review | undefined> {
  return fetchJson<Review>(`${BASE_URL}/reviews/${reviewId}`);
}

export async function createReviewForProduct(productId: string, rating: number, review: string): Promise<Review | undefined> {
  const token = await decodeToken();
  if (!token) return undefined;

  return fetchJson<Review>(`${BASE_URL}/products/${productId}/reviews`, {
    method: 'post',
    headers: {
      token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating, review }),
  });
}

export async function deleteReview(reviewId: string): Promise<boolean> {
  const token = await decodeToken();
  if (!token) return false;

  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: 'delete',
    headers: { token },
  });

  return res.ok;
}