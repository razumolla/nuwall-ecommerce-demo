"use client";

import { useState } from "react";
import { Phone, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const TOP_BG = "#0F3460";

const LANGS = [
  {
    code: "BN",
    label: "BN",
    flag: "https://bonik-react.vercel.app/assets/images/flags/bd.png",
  },
  {
    code: "HN",
    label: "HN",
    flag: "https://bonik-react.vercel.app/assets/images/flags/in.png",
  },
  {
    code: "EN",
    label: "EN",
    flag: "https://bonik-react.vercel.app/assets/images/flags/usa.png",
  },
];

export function HeaderTopBar() {
  const [activeLang, setActiveLang] = useState(LANGS[0]);

  return (
    <div className="w-full" style={{ backgroundColor: TOP_BG }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] text-slate-100">
        {/* Left: phone + email */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-slate-200" />
            <span>+88012 9658 2548</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-slate-200" />
            <span>support@jouleslabs.com</span>
          </div>
        </div>

        {/* Right: links + language */}
        <div className="flex items-center gap-6">
          <button className="hover:text-white">Theme FAQ&apos;s</button>
          <button className="hover:text-white">Need Help?</button>

          {/* Language dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-slate-100 hover:bg-white/15">
                <span className="relative h-4 w-6 overflow-hidden rounded-[3px] bg-slate-200">
                  <Image
                    src={activeLang.flag}
                    alt={activeLang.label}
                    fill
                    className="object-cover"
                  />
                </span>
                <span className="text-[11px] font-medium">
                  {activeLang.code}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-100" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="mt-1 w-32 rounded-xl border-none bg-white p-0 text-[11px] shadow-lg"
            >
              {LANGS.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-3 py-2",
                    activeLang.code === lang.code
                      ? "bg-slate-50 font-semibold text-slate-900"
                      : "text-slate-600"
                  )}
                  onClick={() => setActiveLang(lang)}
                >
                  <span className="relative h-4 w-6 overflow-hidden rounded-[3px] bg-slate-200">
                    <Image
                      src={lang.flag}
                      alt={lang.label}
                      fill
                      className="object-cover"
                    />
                  </span>
                  <span>{lang.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
