"use client";

import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function GlobalError({
  // error,
  reset,
}: {
  // error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id-ID" className={inter.className}>
      <body className="flex flex-col justify-center items-center h-screen gap-6">
        <div className="rounded-full bg-red-100 p-6 dark:bg-red-900">
          <TriangleAlertIcon className="h-12 w-12 text-red-500 dark:text-red-400" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Oops, Terjadi Kesalahan!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Mohon maaf atas ketidaknyamanan ini. Silakan coba lagi nanti.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" asChild>
            <Link href="/">Kembali ke Halaman Utama</Link>
          </Button>
          <Button variant="outline" onClick={() => reset()}>
            Muat Ulang
          </Button>
        </div>
      </body>
    </html>
  );
}

function TriangleAlertIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
