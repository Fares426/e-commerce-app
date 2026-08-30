// app/categories/page.tsx
import { Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/api/services/route.services";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-linear-to-r from-green-500 to-green-400 px-4 sm:px-8 py-10">
        <nav className="text-sm text-white/90 mb-4">
          <span>Home</span> <span className="mx-1">/</span>{" "}
          <span className="font-medium">Categories</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3">
            <Layers className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              All Categories
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Browse our wide range of product categories
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group border rounded-xl bg-white overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative w-full aspect-square bg-neutral-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-neutral-900 group-hover:text-green-600 transition-colors">
                  {category.name}
                </p>
                <span className="text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Subcategories →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}