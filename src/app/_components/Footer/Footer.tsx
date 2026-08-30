import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3">
              <ShoppingCart className="text-green-600" size={24} />

              <span className="text-2xl font-bold text-slate-800">
                FreshCart
              </span>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              FreshCart is your one-stop destination for quality products.
              From fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FiPhone className="text-green-500" size={17} />
                <span>+1 (800) 123-4567</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-green-500" size={17} />
                <span>support@freshcart.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="text-green-500" size={17} />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-green-600 hover:text-white"
              >
                <FaFacebookF size={15} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-green-600 hover:text-white"
              >
                <FaTwitter size={15} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-green-600 hover:text-white"
              >
                <FaInstagram size={15} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-green-600 hover:text-white"
              >
                <FaYoutube size={15} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Shop</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-green-500" href="/">
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-green-500"
                  href="/categories"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-green-500"
                  href="/brands"
                >
                  Brands
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Electronics
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Men's Fashion
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Women's Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Account</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-green-500" href="/profile">
                  My Account
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/orders">
                  Order History
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/wishlist">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/cart">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/login">
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  className="transition hover:text-green-500"
                  href="/register"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Support</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-green-500" href="/support">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/support">
                  Help Center
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Track Order
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 mb-5 text-lg font-semibold text-white">
              Legal
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link className="transition hover:text-green-500" href="/">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-slate-500 md:flex-row">
          <p>© 2026 FreshCart. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <FaCcVisa size={22} />
              <span>Visa</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCcMastercard size={22} />
              <span>Mastercard</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCcPaypal size={22} />
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}