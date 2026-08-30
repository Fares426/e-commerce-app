import { getUserCart } from '@/api/services/route.services';
import type { Cart } from '@/api/services/types';
import { Button } from '@/components/ui/button';
import RemoveFromCartButton from '../_components/RemoveFromCartButton/RemoveFromCartButton';
import UpdateCountButton from './UpdateCountButton';
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ClearCartButton from './ClearCartButton';
import Image from 'next/image';

export default async function CartPage() {
  const userCart = await getUserCart();

  if (!userCart || !userCart.products?.length) {
    return (
      <main className="min-h-[70vh] bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-3 text-slate-600">
            Looks like you haven’t added anything yet. Start shopping to fill your bag with fresh picks.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  const { products, _id, totalCartPrice } = userCart as Cart;

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Cart</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Your shopping bag</h1>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.45fr_0.55fr]">
          <section className="space-y-5">
            {products.map((item) => (
              <article
                key={item._id}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-28">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                          {item.product.category?.name || 'Category'}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-slate-900">{item.product.title}</h2>
                      </div>

                      <p className="text-xl font-bold text-slate-900">{item.price} EGP</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1.5">
                        <UpdateCountButton
                          productId={item.product.id}
                          isIncrement={false}
                          count={Math.max(item.count - 1, 1)}
                        />
                        <span className="min-w-8 text-center text-sm font-semibold text-slate-900">
                          {item.count}
                        </span>
                        <UpdateCountButton
                          productId={item.product.id}
                          count={item.count + 1}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">Subtotal</span>
                        <span className="text-lg font-semibold text-slate-900">
                          {item.price * item.count} EGP
                        </span>
                        <RemoveFromCartButton productId={item.product.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Need a fresh start?</p>
                  <h3 className="text-lg font-semibold text-slate-900">Clear your cart</h3>
                </div>
                <ClearCartButton />
              </div>
            </div>
          </section>

          <aside className="xl:pl-2">
            <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-100">Summary</p>
                    <h2 className="mt-1 text-2xl font-bold">Order summary</h2>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-6">
                <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                    <Truck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Free delivery</p>
                    <p className="text-sm text-emerald-700">On this order</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{totalCartPrice} EGP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span className="font-semibold text-slate-900">Included</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-slate-900">Total</span>
                      <span className="text-3xl font-bold text-slate-900">{totalCartPrice} EGP</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input placeholder="Apply coupon code" className="h-12 rounded-xl border-slate-200 pl-11" />
                </div>

                <Button asChild className="h-14 w-full rounded-xl bg-emerald-600 text-base font-semibold hover:bg-emerald-700">
                  <Link href={`/cart/${_id}`} className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Secure checkout
                  </Link>
                </Button>

                <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Secure checkout
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-sky-600" />
                    Fast nationwide delivery
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
