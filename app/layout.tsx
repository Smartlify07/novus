import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import AppProvider from '../context/app-provider';
import { Toaster } from '@/components/ui/sonner';

const nunitoSans = Nunito_Sans({ variable: '--font-sans' });

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
