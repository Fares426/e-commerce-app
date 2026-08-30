// app/brands/page.tsx
import { Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBrands } from "@/api/services/route.services";




export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero banner */}
      <div className="bg-linear-to-r from-purple-600 to-purple-400 px-4 sm:px-8 py-10">
        <nav className="text-sm text-white/90 mb-4">
          <Link href={'/'}>Home</Link> <span className="mx-1">/</span>{" "}
          <span className="font-medium">Brands</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3">
            <Tag className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              Top Brands
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Shop from your favorite brands
            </p>
          </div>
        </div>
      </div>

      {/* Brand grid */}
      <div className="px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/shop?brand=${brand._id}`}
              className="group border rounded-xl bg-white p-4 flex flex-col items-center gap-3 transition-shadow hover:shadow-lg"
            >
              <div className="relative w-full aspect-square bg-neutral-50 rounded-lg overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="150px"
                  className="object-contain p-4"
                />
              </div>

              <div className="text-center">
                <p className="font-medium text-neutral-900 group-hover:text-purple-600 transition-colors">
                  {brand.name}
                </p>
                <span className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Products →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}