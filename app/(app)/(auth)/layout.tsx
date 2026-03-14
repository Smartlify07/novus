import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary rounded-r-2xl relative hidden lg:flex lg:flex-col lg:gap-10 lg:p-10">
        <div className="flex justify-center gap-2 md:justify-start h-12"></div>
        <div className="flex-1">
          <div>
            <h1 className="text-primary-foreground text-start text-4xl font-semibold mb-2">
              Banking, built for what’s next.
            </h1>
            <p className="text-primary-foreground">
              Total control, zero effort.
            </p>
          </div>

          <Image
            src={'https://placehold.co/600x400?text=Demo image'}
            width={600}
            height={400}
            alt="placeholder-image"
            className="mt-10 rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">{children}</div>
    </div>
  );
}
