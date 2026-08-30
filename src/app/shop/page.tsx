// app/shop/page.tsx
import { LayoutGrid, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  getSpecificCategory,
  getSpecificSubCategory,
} from "@/api/services/route.services";
import ProductCard from "../_components/ProductCard/ProductCard";
import { Product } from "@/api/services/types";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

async function getBrand(id: string): Promise<Brand | null> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data as Brand;
}

async function getProducts(params: {
  brand?: string;
  category?: string;
  subcategory?: string;
  sort?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params.brand) query.set("brand", params.brand);
  if (params.category) query.set("category", params.category);
  if (params.subcategory) query.set("subcategory", params.subcategory);

  const url = `https://ecommerce.routemisr.com/api/v1/products${
    query.toString() ? `?${query.toString()}` : ""
  }`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  let products = data.data as Product[];

  // Apply client-side sorting based on param
  if (params.sort === "price-asc") {
    products.sort((a, b) => (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price));
  } else if (params.sort === "price-desc") {
    products.sort((a, b) => (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price));
  } else if (params.sort === "rating") {
    products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  } else if (params.sort === "newest") {
    products.reverse();
  }

  return products;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; category?: string; subcategory?: string; sort?: string }>;
}) {
  const { brand: brandId, category: categoryId, subcategory: subcategoryId, sort } =
    await searchParams;

  const [products, brand, category, subcategory] = await Promise.all([
    getProducts({ brand: brandId, category: categoryId, subcategory: subcategoryId, sort }),
    brandId ? getBrand(brandId) : Promise.resolve(null),
    categoryId ? getSpecificCategory(categoryId) : Promise.resolve(undefined),
    subcategoryId ? getSpecificSubCategory(subcategoryId) : Promise.resolve(undefined),
  ]);

  // whichever filter is active — only one will be set at a time in this flow
  const activeFilter = brand
    ? { label: brand.name, image: brand.image }
    : category
    ? { label: category.name, image: category.image }
    : subcategory
    ? { label: subcategory.name, image: undefined }
    : null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-linear-to-r from-green-500 to-green-400 px-4 sm:px-8 py-10">
        <nav className="text-sm text-white/90 mb-4">
          <span>Home</span> <span className="mx-1">/</span>{" "}
          <span className="font-medium">
            {activeFilter ? activeFilter.label : "All Products"}
          </span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3 w-14 h-14 flex items-center justify-center overflow-hidden">
            {activeFilter?.image ? (
              <Image
                src={activeFilter.image}
                alt={activeFilter.label}
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            ) : (
              <LayoutGrid className="text-white" size={28} />
            )}
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              {activeFilter ? activeFilter.label : "All Products"}
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              {activeFilter
                ? `Shop ${activeFilter.label} products`
                : "Explore our complete product collection"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {activeFilter && (
              <>
                <span className="text-sm font-medium text-neutral-700">Active Filters:</span>
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                  {activeFilter.label}
                  <Link href="/shop" aria-label="Remove filter">
                    <X size={14} className="cursor-pointer" />
                  </Link>
                </span>
                <Link href="/shop" className="text-sm text-neutral-500 underline hover:text-neutral-700">
                  Clear all
                </Link>
              </>
            )}
            <p className="text-green-600 text-sm font-medium">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}