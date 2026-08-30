// import RegisterForm from "./RegisterForm";
// export default function Register() {

//   return (
//     <div>

//       <div className="w-1/2 mx-auto">
//       <h2>Create Your Account</h2>
//       <h3>Start your fresh journey with us today</h3>
//         <RegisterForm/>
//       </div>
//     </div>
//   )
// }


import RegisterForm from "./RegisterForm";
import {
  ShieldCheck,
  Truck,
  Star,
  UserCircle2,
} from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto grid min-h-screen items-center gap-12 px-6 py-12 lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:block">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>

          <p className="mt-4 max-w-lg text-lg text-gray-500">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <div className="mt-10 space-y-7">
            <div className="flex gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Star className="text-green-600" size={18} />
              </div>

              <div>
                <h3 className="font-semibold">Premium Quality</h3>

                <p className="text-gray-500">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Truck className="text-green-600" size={18} />
              </div>

              <div>
                <h3 className="font-semibold">Fast Delivery</h3>

                <p className="text-gray-500">
                  Same-day delivery available in most areas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <ShieldCheck className="text-green-600" size={18} />
              </div>

              <div>
                <h3 className="font-semibold">Secure Shopping</h3>

                <p className="text-gray-500">
                  Your data and payments are completely secure.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserCircle2 size={42} className="text-green-600" />

              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>

                <div className="text-yellow-400">
                  ★★★★★
                </div>
              </div>
            </div>

            <p className="mt-4 italic text-gray-500">
              "FreshCart has transformed my shopping experience. The quality is
              outstanding, and the delivery is always on time."
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-3xl border bg-white p-10 shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold">
                Create Your Account
              </h2>

              <p className="mt-2 text-gray-500">
                Start your fresh journey with us today
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}