"use server";
import { revalidatePath } from "next/cache";
import { decodeToken } from "@/app/utils";

export async function createReviewAction(productId: string, rating: number, review: string) {
  const token = await decodeToken()

  if (!token) {
    return {
      success: false,
      message: "Please login first.",
    };
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
    {
      method: "post",

      headers: {
        token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        rating,
        review,
      }),
    },
  );

  const data = await res.json();
  console.log("route misr response:", JSON.stringify(data));
  if (!res.ok) {
    return {
      success: false,
      message: data.message,
    };
  }

  revalidatePath(`/products/${productId}`);

  return {
    success: true,
    data,
  };
}


export async function deleteReviewAction(reviewId: string, productId: string) {
  const token = await decodeToken();

  if (!token) {
    return { success: false, message: "Please login first." };
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { token },
  });

  if (!res.ok) {
    let message = "Failed to delete review.";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}
    return { success: false, message };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true };
}
