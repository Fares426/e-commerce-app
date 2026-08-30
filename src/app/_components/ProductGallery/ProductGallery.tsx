'use client'
import { useState } from "react";
import AddToCartButton from "@/app/_components/AddToCartButton/AddToCartButton";
import WishlistButton from "@/app/_components/WishlistButton/WishlistButton";
import { Zap, ShoppingCart } from "lucide-react";

export default function ProductGallery({
  imageCover,
  images,
  title,
}: {
  imageCover: string;
  images: string[];
  title: string;
}) {
  const allImages = [imageCover, ...(images ?? [])];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div>
      <div className="w-full aspect-square rounded-xl overflow-hidden border bg-neutral-50">
        <img src={activeImage} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-2 sm:gap-3 mt-3 overflow-x-auto pb-1">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`shrink-0 w-16 cursor-pointer h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              activeImage === img ? "border-green-500" : "border-transparent hover:border-neutral-300"
            }`}
          >
            <img src={img} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function PurchasePanel({
  productId,
  price,
  quantityAvailable,
}: {
  productId: string;
  price: number;
  quantityAvailable?: number;
}) {
  const [qty, setQty] = useState(1);
  const max = quantityAvailable ?? 99;

  return (
    <div className="border-t pt-4 flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-2">Quantity</p>
        <div className="flex items-center gap-3">
          
          {quantityAvailable != null && (
            <span className="text-xs text-neutral-500">{quantityAvailable} available</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm border-t border-b py-3">
        <span className="text-neutral-500">Total Price:</span>
        <span className="text-lg font-semibold text-green-600">
          {(price * qty).toFixed(2)} EGP
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <AddToCartButton
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2.5 text-sm font-medium transition-colors cursor-pointer"
          productId={productId}
        >
          <ShoppingCart size={16} /> Add to Cart
        </AddToCartButton>
        <AddToCartButton
          className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg py-2.5 text-sm font-medium transition-colors cursor-pointer"
          productId={productId}
          navigate={true}
        >
          <Zap size={16} /> Buy Now
        </AddToCartButton>
        {/* <button className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg py-2.5 text-sm font-medium transition-colors cursor-pointer">
          <Zap size={16} /> Buy Now
        </button> */}
      </div>

      <div className="flex gap-3">
        <WishlistButton productId={productId} className="flex-1" />
      </div>
    </div>
  );
}