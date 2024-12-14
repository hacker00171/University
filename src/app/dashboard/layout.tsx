import type { Metadata } from "next";
// import {Geist_Mono } from "next/font/google";
// import "./globals.css";
import { LanguageProvider } from "@/app/dashboard/context/LanguageContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Saudi Universities Dashboard",
  description: "Interactive dashboard for Saudi universities statistics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <LanguageProvider>      
          {children}
        </LanguageProvider>
  );
}
