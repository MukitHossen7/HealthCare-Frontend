import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/Providers/UserProvider";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI- Powered HealthCare - Find Your Perfect Doctor",
  description:
    "Explore Health Care for expert consultations, health plans, medicine, diagnostics, and support from trusted NGOs. Your health is our priority. The healthcare application built with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          {children}
          <Toaster position="top-right" richColors />
          <LogoutSuccessToast />
        </UserProvider>
      </body>
    </html>
  );
}
