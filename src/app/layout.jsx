'use client'
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/Navbar'
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
      });
    }
  }, []);

  return (
    <html lang="es-MX">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar/>
        <main className="container mx-auto px-5 mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
