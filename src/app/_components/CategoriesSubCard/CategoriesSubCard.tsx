import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { getAllCategories } from "@/api/services/route.services";

export default async function CategoriesSubCard() {
  const allCategories = await getAllCategories();

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Shop By Category</h2>

        <Link
          className="hidden sm:flex items-center text-sm sm:text-base text-green-600 hover:text-green-700 transition-colors shrink-0"
          href="/categories"
        >
          View All Categories
          <span className="ms-2">
            <FaArrowRightLong />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {allCategories?.map((category) => (
          <Link
            key={category._id}
            href={`/shop?category=${category._id}`}
            className="rounded-lg border cursor-pointer p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2 sm:gap-3 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] hover:border-green-500 hover:shadow-md transition-all"
          >
            <img
              className="rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover"
              src={category.image}
              alt={category.name}
              loading="lazy"
            />
            <h3 className="text-xs sm:text-sm line-clamp-1">{category.name}</h3>
          </Link>
        ))}
      </div>

      <Link
        className="sm:hidden flex items-center justify-center text-sm text-green-600 mt-4"
        href="/category"
      >
        View All Categories
        <span className="ms-2">
          <FaArrowRightLong />
        </span>
      </Link>
    </div>
  );
}