import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "JoulesLabs",
  description: "JoulesLabs - Ecommerce Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl min-h-screen px-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
