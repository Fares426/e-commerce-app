// app/categories/[id]/page.tsx
import { Folder, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  getSpecificCategory,
  getSubCategoriesByCategory,
} from "@/api/services/route.services";

export default async function CategorySubcategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [category, subcategories] = await Promise.all([
    getSpecificCategory(id),
    getSubCategoriesByCategory(id),
  ]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-linear-to-r from-green-500 to-green-400 px-4 sm:px-8 py-10">
        <nav className="text-sm text-white/90 mb-4">
          <span>Home</span> <span className="mx-1">/</span>{" "}
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>{" "}
          <span className="mx-1">/</span>{" "}
          <span className="font-medium">{category?.name}</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3">
            <Folder className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              {category?.name}
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Browse {category?.name} products
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </Link>

        <h2 className="font-semibold text-lg mb-4">
          {subcategories?.length} Subcategories in {category?.name}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {subcategories?.map((sub) => (
            <Link
              key={sub._id}
              href={`/shop?subcategory=${sub._id}`}
              className="group border rounded-xl bg-white p-5 transition-shadow hover:shadow-lg"
            >
              <div className="bg-green-50 rounded-lg p-3 w-fit mb-4">
                <Folder className="text-green-600" size={22} />
              </div>
              <p className="font-semibold text-neutral-900">{sub.name}</p>
              <span className="text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Browse Products →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}