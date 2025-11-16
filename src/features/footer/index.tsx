import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Play,
  Apple,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F3460] text-slate-100">
      {/* Top footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,3fr)]">
          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            {/* Brand + text + app buttons */}
            <div className="space-y-5">
              <div className="text-3xl font-extrabold tracking-tight">
                <span className="text-[#FF6A3D]">NuWall</span>
              </div>
              <p className="max-w-md text-sm text-slate-200/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                libero id et, in gravida. Sit diam duis mauris nulla cursus.
                Erat et lectus vel ut sollicitudin elit at amet.
              </p>

              {/* App store buttons (simple mock) */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 rounded-md bg-[#15447e] px-4 py-2 text-xs font-medium hover:cursor-pointer">
                  <Play className="h-5 w-5 rounded " />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] text-slate-300">
                      Get it on
                    </span>
                    <span>Google Play</span>
                  </span>
                </button>

                <button className="flex items-center gap-2 rounded-md bg-[#15447e] px-4 py-2 text-xs font-medium hover:cursor-pointer">
                  <Apple className="h-5 w-5" />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] text-slate-300">
                      Download on the
                    </span>
                    <span>App Store</span>
                  </span>
                </button>
              </div>
            </div>
            {/* About Us */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold">About Us</h3>
              <ul className="space-y-2 text-slate-200/80">
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms &amp; Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold">Customer Care</h3>
              <ul className="space-y-2 text-slate-200/80">
                <li>Help Center</li>
                <li>How to Buy</li>
                <li>Track Your Order</li>
                <li>Corporate &amp; Bulk Purchasing</li>
                <li>Returns &amp; Refunds</li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold">Contact Us</h3>
              <div className="space-y-2 text-slate-200/80">
                <p className="text-sm">
                  70 Washington Square South, New York, NY 10012, United States
                </p>
                <p className="text-sm">Email: uilib.help@gmail.com</p>
                <p className="text-sm">Phone: +1 1123 456 780</p>
              </div>

              {/* Social icons */}
              <div className="mt-4 flex gap-3">
                {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 text-slate-100 hover:bg-slate-800 hover:cursor-pointer"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-300/80 md:flex-row md:px-6">
          <p>© {year} Bonik. All rights reserved.</p>
          <p>
            Made with <span className="text-red-400">♥</span> by{" "}
            <Link
              href="https://twitter.com/JoulesLabs"
              target="_blank"
              className="font-medium text-slate-100 hover:text-[#FF6A3D]"
            >
              JoulesLabs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
