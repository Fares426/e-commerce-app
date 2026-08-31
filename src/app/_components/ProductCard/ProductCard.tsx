import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistButton from "../WishlistButton/WishlistButton";
import { ProductCardProps } from "./productCard.types";
import { getWishlist } from "@/app/_actions/wishlist.actions";

export default async function ProductCard({ product }: ProductCardProps) {
  const wishlistIds = await getWishlist();
  const isInWishlist = wishlistIds.includes(product.id);

  return (
    <div className="group border rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-lg">
      <div className="relative w-full aspect-3/4 bg-neutral-100">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.priceAfterDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {Math.round(100 - (product.priceAfterDiscount / product.price) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-1">
        <p className="text-xs text-neutral-500">{product.category.name}</p>
        <h2 className="text-sm sm:text-base font-medium line-clamp-1">
          {product.title.split(" ", 2).join(" ")}
        </h2>

        <p className="text-xs sm:text-sm text-neutral-600">
          ★ {product.ratingsAverage} ({product.ratingsQuantity})
        </p>

        <div className="flex items-center justify-between mt-1">
          <h5 className="text-sm sm:text-base font-semibold">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-red-500 line-through text-xs mr-1.5">
                  {product.price}
                </span>
                <span>{product.priceAfterDiscount} EGP</span>
              </>
            ) : (
              <span>{product.price} EGP</span>
            )}
          </h5>

          <AddToCartButton
            className="text-white cursor-pointer rounded-full bg-green-500 hover:bg-green-600 transition-colors w-8 h-8 sm:w-9 sm:h-9 text-xl sm:text-2xl flex items-center justify-center leading-none"
            productId={product.id}
          >
            +
          </AddToCartButton>
        </div>

        <div className="pt-2">
          <WishlistButton
            productId={product.id}
            compact
            className="w-full"
            initialIsSaved={isInWishlist}
          />
        </div>
      </div>
    </div>
  );
}