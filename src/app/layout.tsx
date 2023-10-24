import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import React from 'react';

import { getServerAuthSession } from '@/server/auth';

import '@/styles/globals.css';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { homeNavigation } from '@/config/navigation';
import { TRPCReactProvider } from '@/trpc/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <head />
      <body className='min-h-screen bg-background flex flex-col font-sans antialiased'>
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Navbar items={homeNavigation} session={session} />
            <div className='px-3 md:container py-5'>{children}</div>
            <Footer />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
