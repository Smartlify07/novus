import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import AppProvider from './providers/app-provider';
import { Toaster } from '@/components/ui/sonner';
import makeServer from '@/lib/mirage';
import { MirageProvider } from './providers/mirage-provider';

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
        <AppProvider>
          <MirageProvider>{children}</MirageProvider>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
