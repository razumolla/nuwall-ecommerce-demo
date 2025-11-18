"use client";

import { Truck, CreditCard, ShieldCheck, Headphones } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    label: "World Wide Delivery",
    icon: Truck,
  },
  {
    id: 2,
    label: "Safe Payment",
    icon: CreditCard,
  },
  {
    id: 3,
    label: "Shop With Confidence",
    icon: ShieldCheck,
  },
  {
    id: 4,
    label: "24/7 Support",
    icon: Headphones,
  },
];

export function ServiceHighlights() {
  return (
    <section className=" mx-auto max-w-7xl px-4 py-5">
      <div className="grid gap-5 md:grid-cols-4">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex h-48 flex-col items-center justify-center rounded-xl text-center shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                <Icon className="h-8 w-8 text-[#0F3460]" />
              </div>
              <p className="mt-5 text-sm font-medium text-slate-800">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
