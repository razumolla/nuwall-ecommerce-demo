import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/features/header";
import Footer from "@/features/footer";

export const metadata: Metadata = {
  title: "My Shop",
  description: "Simple e-commerce demo",
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
        <main className="mx-auto max-w-7xl min-h-screen px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
