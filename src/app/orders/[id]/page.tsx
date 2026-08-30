import { getSpecificOrder } from '@/api/services/route.services';
import { ArrowLeft, Box, CreditCard, MapPin, PackageCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getSpecificOrder(id);

  if (!order) {
    notFound();
  }

  const itemCount = order.cartItems?.reduce((sum, item) => sum + (item.count ?? 0), 0) ?? 0;

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/orders"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Order details</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">#{order._id.slice(-8)}</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
              <PackageCheck className="h-4 w-4" />
              {order.isPaid ? 'Paid' : 'Pending'}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Total</p>
              <p className="mt-2 text-xl font-bold text-slate-900">{order.totalOrderPrice ?? 0} EGP</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Items</p>
              <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Box className="h-4 w-4 text-emerald-600" />
                {itemCount}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Delivery</p>
              <p className="mt-2 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Truck className="h-4 w-4 text-sky-600" />
                {order.isDelivered ? 'Delivered' : 'Processing'}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Shipping address</h2>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-medium text-slate-900">City:</span> {order.shippingAddress?.city || 'N/A'}</p>
                <p><span className="font-medium text-slate-900">Address:</span> {order.shippingAddress?.details || 'N/A'}</p>
                <p><span className="font-medium text-slate-900">Phone:</span> {order.shippingAddress?.phone || 'N/A'}</p>
                <p><span className="font-medium text-slate-900">Postal code:</span> {order.shippingAddress?.postalCode || 'N/A'}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Payment</h2>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-medium text-slate-900">Method:</span> {order.paymentMethodType ?? 'Cash'}</p>
                <p><span className="font-medium text-slate-900">Status:</span> {order.isPaid ? 'Paid' : 'Pending'}</p>
                <p><span className="font-medium text-slate-900">Order total:</span> {order.totalOrderPrice ?? 0} EGP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
