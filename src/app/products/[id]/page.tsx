import { getSpecificProduct, getAllProducts } from "@/api/services/route.services";
import ProductGallery, { PurchasePanel } from "@/app/_components/ProductGallery/ProductGallery";
import ProductTabs from "@/app/_components/ProductTabs/ProductTabs";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const productDetails = await getSpecificProduct(id);

  if (!productDetails) return <div className="p-10 text-center">Product not found.</div>;

  // Fetch recommended products from the same category
  const allProducts = (await getAllProducts()) ?? [];
  const recommendedProducts = allProducts
    .filter(
      (p) =>
        p.category._id === productDetails.category._id &&
        p.id !== productDetails.id
    )
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-neutral-500 mb-4 sm:mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <span className="hover:text-green-600">
          {productDetails.category.name}
        </span>
        <span>/</span>
        <span className="text-neutral-800 line-clamp-1">
          {productDetails.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductGallery
          imageCover={productDetails.imageCover}
          images={productDetails.images}
          title={productDetails.title}
        />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
              {productDetails.category.name}
            </span>
            {productDetails.brand?.name && (
              <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full font-medium">
                {productDetails.brand.name}
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            {productDetails.title}
          </h1>

          <p className="text-sm text-neutral-600">
            ★ {productDetails.ratingsAverage} ({productDetails.ratingsQuantity}{" "}
            reviews)
          </p>

          <div className="text-2xl sm:text-3xl font-bold text-green-600">
            {productDetails.priceAfterDiscount ? (
              <span className="flex items-center gap-2">
                <span className="text-base text-neutral-400 line-through font-normal">
                  {productDetails.price} EGP
                </span>
                {productDetails.priceAfterDiscount} EGP
              </span>
            ) : (
              <span>{productDetails.price} EGP</span>
            )}
          </div>

          <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            In Stock
          </p>

          <p className="text-sm text-neutral-500 border-t pt-4">
            {productDetails.description}
          </p>

          <PurchasePanel
            productId={productDetails.id as string}
            price={productDetails.priceAfterDiscount ?? productDetails.price}
            quantityAvailable={productDetails.quantity}
          />

          <div className="grid grid-cols-3 gap-3 border-t pt-4 mt-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
              <Truck className="text-green-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium">Free Delivery</p>
                <p className="text-[11px] text-neutral-500">
                  Orders over 500 EGP
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
              <RotateCcw className="text-green-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium">30 Days Return</p>
                <p className="text-[11px] text-neutral-500">Money back</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
              <ShieldCheck className="text-green-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium">Secure Payment</p>
                <p className="text-[11px] text-neutral-500">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs
        productId={productDetails.id as string}
        description={productDetails.description}
        category={productDetails.category.name}
        subcategory={productDetails.subcategory?.[0]?.name}
        brand={productDetails.brand?.name}
        ratingsAverage={productDetails.ratingsAverage}
        ratingsQuantity={productDetails.ratingsQuantity}
        reviews={productDetails.reviews}
      />

      {recommendedProducts.length > 0 && (
        <div className="mt-16 border-t pt-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
              Recommended
            </p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-900">
              Similar products you might like
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}