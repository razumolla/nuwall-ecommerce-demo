"use client";

import { useState } from "react";
import {
  Grid2X2,
  ChevronDown,
  Shirt,
  Monitor,
  Bike,
  Flower2,
  Gift,
  Music2,
  HeartPulse,
  PawPrint,
  Baby,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/",
    name: "User Account",
  },
  {
    href: "/",
    name: "Vendor Account",
  },
  {
    href: "/track-my-orders",
    name: "Track My Orders",
  },
];

type Column = { title: string; items: string[] };

type Category = {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  columns: Column[];
};

const CATEGORIES: Category[] = [
  {
    id: "fashion",
    label: "Fashion",
    icon: Shirt,
    columns: [
      {
        title: "Man Clothes",
        items: ["Shirt", "T-shirt", "Pant", "Underwear"],
      },
      {
        title: "Accessories",
        items: ["Belt", "Hat", "Watches", "Sunglasses"],
      },
      {
        title: "Shoes",
        items: ["Sneakers", "Sandals", "Formal", "Casual"],
      },
      {
        title: "Bags",
        items: ["Backpack", "Side Bags", "Crossbody Bags", "Slides"],
      },
      {
        title: "Woman Clothes",
        items: ["Shirt", "T-shirt", "Pant", "Underwear"],
      },
    ],
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: Monitor,
    columns: [
      { title: "Computers", items: ["Laptops", "Desktops", "Monitors"] },
      { title: "Mobiles", items: ["Smartphones", "Feature Phones"] },
      { title: "Accessories", items: ["Keyboards", "Mice", "Headphones"] },
    ],
  },
  {
    id: "bikes",
    label: "Bikes",
    icon: Bike,
    columns: [
      { title: "Types", items: ["Road Bike", "Mountain Bike", "BMX"] },
      { title: "Accessories", items: ["Helmet", "Gloves", "Lights"] },
    ],
  },
  {
    id: "home",
    label: "Home & Garden",
    icon: Flower2,
    columns: [
      { title: "Furniture", items: ["Sofa", "Bed", "Dining Table"] },
      { title: "Decor", items: ["Wall Art", "Plants", "Lights"] },
    ],
  },
  {
    id: "gifts",
    label: "Gifts",
    icon: Gift,
    columns: [
      { title: "For Him", items: ["Wallet", "Watch", "Perfume"] },
      { title: "For Her", items: ["Jewelry", "Handbag", "Scarf"] },
    ],
  },
  {
    id: "music",
    label: "Music",
    icon: Music2,
    columns: [
      { title: "Instruments", items: ["Guitar", "Keyboard", "Drums"] },
      { title: "Audio", items: ["Speakers", "Headphones"] },
    ],
  },
  {
    id: "health",
    label: "Health & Beauty",
    icon: HeartPulse,
    columns: [
      { title: "Skin Care", items: ["Moisturizer", "Serum", "Cream"] },
      { title: "Makeup", items: ["Lipstick", "Foundation"] },
    ],
  },
  {
    id: "pets",
    label: "Pets",
    icon: PawPrint,
    columns: [
      { title: "Dog", items: ["Food", "Toys", "Leash"] },
      { title: "Cat", items: ["Food", "Litter", "Toys"] },
    ],
  },
  {
    id: "baby",
    label: "Baby Toys",
    icon: Baby,
    columns: [
      { title: "Age 0–2", items: ["Rattles", "Soft Toys"] },
      { title: "Age 3–5", items: ["Blocks", "Cars"] },
    ],
  },
  {
    id: "groceries",
    label: "Groceries",
    icon: ShoppingBasket,
    columns: [
      { title: "Fruits", items: ["Apple", "Banana", "Orange"] },
      { title: "Vegetables", items: ["Tomato", "Potato", "Carrot"] },
    ],
  },
];

export function HeaderNavBar() {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div
          className="relative flex items-center justify-between"
          onMouseLeave={() => setOpen(false)}
        >
          {/* Categories button */}
          <Button
            variant="outline"
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "flex h-10 w-72 items-center justify-between gap-2 rounded-md bg-slate-50 px-4 text-[14px] font-medium text-slate-600 transition-colors",
              open && "bg-[#FFECEF] text-[#FF6A3D]"
            )}
          >
            <div className="flex items-center justify- gap-2">
              <Grid2X2
                className={cn(
                  "h-4 w-4 text-slate-500",
                  open && "text-[#FF6A3D]"
                )}
              />
              <span>Categories</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </Button>

          {/* Main nav links */}
          <nav className="flex flex-1 items-center justify-end gap-7 text-[13px] font-medium  text-slate-600">
            {NAV_LINKS.map((item, idx) => (
              <Link key={idx} href={item.href} className="hover:text-[#FF6A3D]">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mega menu panel */}
          {open && (
            <div className="absolute left-0 top-12 z-30 flex w-full justify-start">
              <div className="flex w-[880px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(15,52,96,0.12)]">
                {/* Left category list */}
                <div className="w-64 border-r border-slate-100 bg-white">
                  <ul className="py-2 text-[13px]">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const active = activeCategory.id === cat.id;
                      return (
                        <li key={cat.id}>
                          <button
                            onMouseEnter={() => setActiveCategory(cat)}
                            className={cn(
                              "flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors",
                              active
                                ? "bg-[#FFECEF] font-semibold text-[#FF6A3D]"
                                : "text-slate-700 hover:bg-slate-50"
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <Icon
                                className={cn(
                                  "h-4 w-4 text-slate-500",
                                  active && "text-[#FF6A3D]"
                                )}
                              />
                              <span>{cat.label}</span>
                            </span>
                            <span className="text-[10px] text-slate-300">
                              &gt;
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right multi-column content + banner */}
                <div className="flex flex-1">
                  {/* Columns */}
                  <div className="flex-1 px-6 py-5">
                    <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-[13px] text-slate-600">
                      {activeCategory.columns.map((col) => (
                        <div key={col.title}>
                          <h4 className="mb-2 text-[13px] font-semibold text-slate-900">
                            {col.title}
                          </h4>
                          <ul className="space-y-1">
                            {col.items.map((item) => (
                              <li
                                key={item}
                                className="cursor-pointer text-slate-600 hover:text-[#FF6A3D]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Promo banner */}
                  <div className="relative w-64 border-l border-slate-100 bg-[#FFECEF] p-4">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[#FF6A3D]">
                        40% OFF
                      </p>
                      <p className="text-[13px] font-semibold text-slate-900">
                        Limited time offer
                      </p>
                      <button className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#FF6A3D] px-4 py-1.5 text-[12px] font-semibold text-[#FF6A3D]">
                        Shop Now <span className="text-[14px]">+</span>
                      </button>
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
                      <div className="relative h-28 w-40">
                        {/* demo image; replace with your own */}
                        <Image
                          src="/offer-1.webp"
                          alt="Promo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
