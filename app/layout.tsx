import type { Metadata } from 'next';
import { Geist, Geist_Mono, Nunito_Sans } from 'next/font/google';
import './globals.css';

import AppProvider from './app-provider';
import { Toaster } from '@/components/ui/sonner';

const nunitoSans = Nunito_Sans({ variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Novus Finance',
  description: 'Banking with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className={`antialiased`}>
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
