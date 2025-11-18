"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">
          404 error
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-3 text-base text-gray-500 sm:mt-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            Go back home
          </Link>

          <Link
            href="/flash-deal"
            className="text-sm font-medium text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
          >
            View today&apos;s deals
          </Link>
        </div>
      </div>
    </main>
  );
}
