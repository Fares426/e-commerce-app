'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface SortDropdownProps {
  brandId?: string;
  categoryId?: string;
  subcategoryId?: string;
  currentSort?: string;
}

export default function SortDropdown({
  brandId,
  categoryId,
  subcategoryId,
  currentSort = '',
}: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    if (brandId) params.set('brand', brandId);
    if (categoryId) params.set('category', categoryId);
    if (subcategoryId) params.set('subcategory', subcategoryId);
    if (e.target.value) params.set('sort', e.target.value);

    router.push(`/shop${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <select
      defaultValue={currentSort}
      onChange={handleSortChange}
      className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-400 cursor-pointer"
    >
      <option value="">Recommended</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating">Highest Rated</option>
      <option value="newest">Newest</option>
    </select>
  );
}
