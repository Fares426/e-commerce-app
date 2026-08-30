import Link from "next/link";
import { Home, Search, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Search className="h-9 w-9" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          404 Error
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-slate-600">
          The page you are looking for may have been moved, deleted, or never existed.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            <ShoppingBag className="h-4 w-4" />
            Explore shop
          </Link>
        </div>
      </div>
    </main>
  );
}
