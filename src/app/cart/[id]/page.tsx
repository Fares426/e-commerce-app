'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState, useEffect } from 'react';
import { handleCashOrderAction, handleOnlineOrderAction } from '../cart.actions';
import { useParams, useRouter } from 'next/navigation';
import type { CashOrder, Cart } from '@/api/services/types';
import { toast } from 'sonner';
import { useCart } from '@/app/_providers/cartContextProvider';
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck, Truck, Package } from 'lucide-react';
import Link from 'next/link';
import { getCheckoutCart } from '../checkout.actions';
import Image from 'next/image';

export default function PaymentPage() {
  const { id } = useParams();
  const { updateNumberOfCartItems } = useCart();
  const router = useRouter();
  const detailsInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const postalCodeInput = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartData, setCartData] = useState<Cart | null>(null);

  useEffect(() => {
    (async () => {
      const cart = await getCheckoutCart();
      if (cart) setCartData(cart);
    })();
  }, []);

  function getShippingAddress() {
    return {
      details: (detailsInput.current?.value ?? '').trim(),
      city: (cityInput.current?.value ?? '').trim(),
      phone: (phoneInput.current?.value ?? '').trim(),
      postalCode: (postalCodeInput.current?.value ?? '').trim(),
    };
  }

  async function handleCashOrder() {
    const payload: CashOrder = { shippingAddress: getShippingAddress() };

    if (!payload.shippingAddress.details || !payload.shippingAddress.city || !payload.shippingAddress.phone) {
      toast.error('Please complete the delivery details before placing your order.', { position: 'top-center' });
      return;
    }

    setIsSubmitting(true);
    const isCreated = await handleCashOrderAction(id as string, payload);
    setIsSubmitting(false);

    if (isCreated) {
      toast.success('Cash order created successfully.', { position: 'top-center' });
      updateNumberOfCartItems(0);
      router.push('/orders');
    } else {
      toast.error('Something went wrong while creating your order.', { position: 'top-center' });
    }
  }

  async function handleOnlineOrder() {
    const payload: CashOrder = { shippingAddress: getShippingAddress() };

    if (!payload.shippingAddress.details || !payload.shippingAddress.city || !payload.shippingAddress.phone) {
      toast.error('Please complete the delivery details before continuing to payment.', { position: 'top-center' });
      return;
    }

    setIsSubmitting(true);
    const redirectLink = await handleOnlineOrderAction(id as string, payload);
    setIsSubmitting(false);

    if (redirectLink === false || !redirectLink) {
      toast.error('Unable to start the online payment session.', { position: 'top-center' });
      return;
    }

    window.location.href = redirectLink;
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Checkout</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Secure payment</h1>
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to cart
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">✓</div>
            <span className="text-slate-500">Bag</span>
            <div className="h-0.5 w-8 bg-slate-300"></div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">2</div>
            <span className="font-medium text-slate-900">Payment</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Delivery details</p>
                <h2 className="text-2xl font-bold text-slate-900">Shipping information</h2>
              </div>
              <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                <MapPin className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <Label htmlFor="details" className="mb-2 block text-sm font-medium text-slate-700">Address details</Label>
                <Input id="details" ref={detailsInput} placeholder="Street, building, apartment" className="h-12 rounded-xl border-slate-200" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">City</Label>
                  <Input id="city" ref={cityInput} placeholder="Cairo" className="h-12 rounded-xl border-slate-200" />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-slate-700">Postal code</Label>
                  <Input id="postalCode" ref={postalCodeInput} placeholder="12345" className="h-12 rounded-xl border-slate-200" />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">Phone number</Label>
                <Input id="phone" ref={phoneInput} placeholder="01000000000" className="h-12 rounded-xl border-slate-200" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Button
                onClick={handleCashOrder}
                disabled={isSubmitting}
                className="h-12 rounded-xl bg-emerald-600 text-base font-semibold hover:bg-emerald-700"
              >
                {isSubmitting ? 'Processing...' : 'Create Cash Order'}
              </Button>

              <Button
                onClick={handleOnlineOrder}
                disabled={isSubmitting}
                variant="outline"
                className="h-12 rounded-xl border-emerald-200 bg-emerald-50 text-base font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay online
              </Button>
            </div>
          </section>

          <aside className="space-y-5">
            {cartData && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-semibold text-slate-900">Order summary</h3>
                  </div>
                  <span className="text-sm text-slate-500">{cartData.products?.length || 0} items</span>
                </div>

                <div className="max-h-48 space-y-2 overflow-y-auto border-b border-slate-200 pb-4">
                  {cartData.products?.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center gap-3 text-sm">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-slate-900">{item.product.title.split(' ').slice(0, 3).join(' ')}</p>
                        <p className="text-xs text-slate-500">qty: {item.count}</p>
                      </div>
                      <p className="font-semibold text-slate-900">{item.price * item.count} EGP</p>
                    </div>
                  ))}
                  {cartData.products && cartData.products.length > 3 && (
                    <p className="text-xs text-slate-500 py-2">+{cartData.products.length - 3} more items</p>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">{cartData.totalCartPrice} EGP</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-slate-900">{cartData.totalCartPrice} EGP</span>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Safe checkout</p>
                  <h3 className="text-xl font-bold text-slate-900">Trusted payment</h3>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  Secure transactions and verified checkout
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                  <Truck className="h-5 w-5 text-sky-600" />
                  Fast delivery with real-time order tracking
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
