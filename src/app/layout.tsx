import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { homeNavigation } from "@/config/navigation";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import * as React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function MaintainerWarningBar() {
  return (
    <div className="flex justify-center bg-secondary text-secondary-foreground py-1 font-semibold text-sm">
      <a
        href="https://github.com/albugowy15/informatics-frs-helper"
        target="_blank"
        className="hover:text-primary flex items-center gap-2"
      >
        <ExclamationTriangleIcon />
        <ExclamationTriangleIcon />
        <ExclamationTriangleIcon />
        <span>
          Website ini sudah tidak di-<i>maintain</i>
        </span>
        <ExclamationTriangleIcon />
        <ExclamationTriangleIcon />
        <ExclamationTriangleIcon />
      </a>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id-ID" className={inter.className}>
      <head />
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster closeButton richColors expand={false} />
            <MaintainerWarningBar />
            <Navbar items={homeNavigation} />
            <div className="px-5 py-5">{children}</div>
            <Footer />
          </ThemeProvider>
        </TRPCReactProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
