import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Willvin Gómez",
  description: "Dashboard de gestión inmobiliaria para Araya Punta Cana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex`}
      >
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
