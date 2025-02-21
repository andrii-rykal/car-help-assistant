import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Footer, Header } from '@/components';
import { CssBaseline } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Car-assistant',
  description: 'all information about the car in one application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <CssBaseline />
      <html lang='uk'>
        <body className={`${roboto.variable} antialiased`}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </React.Fragment>
  );
}
