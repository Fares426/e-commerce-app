import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { getUserWishlist } from '@/api/services/route.services';

export default async function WishlistPage() {
  const wishlist = (await getUserWishlist()) ?? [];

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Saved Items
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Your wishlist</h1>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">Your wishlist is empty</h2>
            <p className="mt-3 text-slate-600">
              Save the products you love and come back to them anytime.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <ShoppingBag className="h-4 w-4" />
              Explore products
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((item) => {
              const productId = item.id ?? item._id ?? '';
              const image = item.imageCover ?? item.images?.[0] ?? '/placeholder.png';
              const title = item.title ?? 'Product';
              const price = item.price ?? 0;

              return (
                <Link
                  key={productId}
                  href={`/products/${productId}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-4/3 bg-slate-100">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-emerald-600">
                      {item.category?.name || 'Featured'}
                    </p>
                    <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
                      {title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">{price} EGP</span>
                      <span className="text-xs text-slate-500">Saved item</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
