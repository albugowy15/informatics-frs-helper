import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { homeNavigation } from "@/config/navigation";
import "@/styles/globals.css";
import { TRPCProvider } from "@/trpc/client";
import { HydrateClient } from "@/trpc/server";
import { Inter } from "next/font/google";
import * as React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id-ID" className={inter.className} suppressHydrationWarning>
      <head />
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <TRPCProvider>
          <HydrateClient>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster closeButton richColors expand={false} />
              <Navbar items={homeNavigation} />
              <div className="px-5 py-5">{children}</div>
              <Footer />
            </ThemeProvider>
          </HydrateClient>
        </TRPCProvider>
      </body>
    </html>
  );
}
