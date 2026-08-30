// _components/FeaturesBar/FeaturesBar.tsx
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure transactions" },
  { icon: RotateCcw, title: "Easy Returns", desc: "14-day return policy" },
  { icon: Headset, title: "24/7 Support", desc: "Dedicated support team" },
];

export default function FeaturesBar() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 rounded-lg border p-3 sm:p-4">
            <Icon className="text-green-500 bg-white rounded-full p-3 shrink-0" size={45} />
            <div>
              <h4 className="text-sm font-medium">{title}</h4>
              <p className="text-xs text-neutral-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}