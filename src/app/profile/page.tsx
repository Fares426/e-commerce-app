import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Package, ShoppingBag, Heart, UserCircle2 } from 'lucide-react';
import { getAllOrders, getUserCart, getUserWishlist } from '@/api/services/route.services';

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  const [cart, wishlist, orders] = await Promise.all([
    getUserCart(),
    getUserWishlist(),
    getAllOrders(),
  ]);

  const stats = [
    {
      label: 'Cart Items',
      value: cart?.products?.length ?? 0,
      icon: ShoppingBag,
    },
    {
      label: 'Wishlist',
      value: wishlist?.length ?? 0,
      icon: Heart,
    },
    {
      label: 'Orders',
      value: orders?.length ?? 0,
      icon: Package,
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-linear-to-r from-emerald-600 to-green-500 p-8 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <UserCircle2 className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Account</p>
              <h1 className="mt-2 text-3xl font-bold">{session.user.name || 'Welcome back'}</h1>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/shop"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Explore products
              </Link>
              <Link
                href="/cart"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                View cart
              </Link>
              <Link
                href="/wishlist"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Saved items
              </Link>
              <Link
                href="/support"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Support center
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Account details</h2>
            <dl className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt>Name</dt>
                <dd className="font-medium text-slate-900">{session.user.name || 'Customer'}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt>Email</dt>
                <dd className="font-medium text-slate-900">{session.user.email || 'N/A'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Status</dt>
                <dd className="font-medium text-emerald-600">Active</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
