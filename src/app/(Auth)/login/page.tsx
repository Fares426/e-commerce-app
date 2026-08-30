// import LoginForm from "./LoginForm";

// export default function Login() {
// return <div>

//       <div className="w-1/2 mx-auto">
//         <LoginForm/>
//       </div>
//     </div>
 
// }

import Image from "next/image";
import Link from "next/link";
import cartImage from "@/assets/images/2e5810ff3e-e750761ebcd4ae5907db.png";
import LoginForm from "./LoginForm";
import { ShieldCheck, Truck, Clock, Star, Users } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto grid min-h-screen lg:grid-cols-2 items-center gap-12 px-6 py-12">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col items-center">
          <div className="relative w-full max-w-xl aspect-square rounded-3xl bg-white shadow-xl p-8">
            <Image
              src={cartImage}
              alt="FreshCart"
              fill
              className="object-contain p-6"
              priority
            />
          </div>

          <h1 className="mt-8 text-center text-5xl font-bold leading-tight text-slate-900">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h1>

          <p className="mt-5 max-w-lg text-center text-lg text-slate-500">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs.
          </p>

          <div className="mt-8 flex gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="text-green-600" size={18} />
              Free Delivery
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={18} />
              Secure Payment
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-green-600" size={18} />
              24/7 Support
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-3xl border bg-white p-10 shadow-xl">

            <div className="text-center">
              <h2 className="text-5xl font-bold">
                Fresh<span className="text-green-600">Cart</span>
              </h2>

              <h3 className="mt-5 text-3xl font-semibold">
                Welcome Back!
              </h3>

              <p className="mt-3 text-slate-500">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="mx-4 text-xs uppercase tracking-wider text-gray-400">
                Continue with Email
              </span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <LoginForm />

            <div className="mt-8 border-t pt-8">
              <p className="text-center text-sm text-gray-500">
                New to FreshCart?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-green-600 hover:underline"
                >
                  Create an account
                </Link>
              </p>

              <div className="mt-8 flex justify-center gap-8 text-xs text-gray-400">

                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} />
                  SSL Secured
                </div>

                <div className="flex items-center gap-1">
                  <Users size={14} />
                  50K+ Users
                </div>

                <div className="flex items-center gap-1">
                  <Star size={14} />
                  4.9 Rating
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}