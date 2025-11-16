"use client";

import { useState } from "react";
import { Search, ChevronDown, User, ShoppingBag } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All Categories",
  "Car",
  "Clothes",
  "Electronics",
  "Laptop",
  "Desktop",
  "Camera",
  "Toys",
];

export function HeaderMainBar() {
  const [activeCategory, setActiveCategory] =
    useState<string>("All Categories");

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-[32px] font-extrabold tracking-tight leading-none"
        >
          <span className="text-[#FF6A3D] italic">JoulesLabs</span>
        </Link>

        {/* Search bar */}
        <div className="mx-6 flex flex-1 justify-center">
          <div className="flex h-12 w-full max-w-[640px] items-center overflow-hidden rounded-full border border-slate-200 bg-white text-[13px] shadow-sm">
            {/* Left icon */}
            <div className="flex h-full w-12 items-center justify-center text-slate-400">
              <Search className="h-4 w-4" />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search product by name..."
              className="h-full flex-1 border-none bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
            />

            {/* Divider */}
            <div className="h-9 w-px bg-slate-200" />

            {/* Category dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-full min-w-[170px] items-center justify-between px-4 text-[13px] text-slate-500 hover:cursor-pointer">
                  <span>{activeCategory}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="mt-1 w-[210px] rounded-xl border border-slate-100 bg-white p-1 text-[13px] shadow-lg"
              >
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-600",
                      activeCategory === cat &&
                        "bg-slate-50 font-medium text-slate-900"
                    )}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right small buttons (GC / DB with badge) */}
        <div className="hidden gap-3 lg:flex">
          <Button
            variant="ghost"
            className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 text-xs font-semibold text-slate-500"
          >
            <User className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-50 text-xs font-semibold text-slate-500 "
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6A3D] text-[10px] font-semibold text-white">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
