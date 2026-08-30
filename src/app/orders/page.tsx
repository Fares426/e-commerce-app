import { getAllOrders } from '@/api/services/route.services';
import Link from 'next/link';
import { ArrowLeft, Box, CalendarClock, PackageCheck, ShoppingBag } from 'lucide-react';

export default async function OrdersPage() {
  const orders = (await getAllOrders()) ?? [];

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Orders</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Order history</h1>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">No orders yet</h2>
            <p className="mt-3 text-slate-600">
              Your orders will appear here after you place your first purchase.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const itemCount = order.cartItems?.reduce((sum, item) => sum + (item.count ?? 0), 0) ?? 0;
              const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent';

              return (
                <Link
                  key={order._id}
                  href={`/orders/${order._id}`}
                  className="block rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Order ID</p>
                      <h2 className="mt-1 text-lg font-semibold text-slate-900">#{order._id.slice(-8)}</h2>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                      <PackageCheck className="h-4 w-4" />
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Total</p>
                      <p className="mt-2 text-xl font-bold text-slate-900">{order.totalOrderPrice ?? 0} EGP</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Items</p>
                      <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <Box className="h-4 w-4 text-emerald-600" />
                        {itemCount}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Payment</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{order.paymentMethodType ?? 'Cash'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Date</p>
                      <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <CalendarClock className="h-4 w-4 text-emerald-600" />
                        {createdAt}
                      </p>
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
