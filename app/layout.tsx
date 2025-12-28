import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ReduxProvider } from "./providers/ReduxProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import OAuthListener from "../components/OAuthListener";
import { AuthProvider } from "../components/AuthProvider";
import { AuthNav } from "../components/AuthNav";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel with Google OAuth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>
              <header className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white">
                <Link href="/" className="font-semibold text-white">Admin Panel</Link>
                <div className="flex items-center gap-4">
                  <AuthNav />
                  <ThemeToggle />
                </div>
              </header>
              <OAuthListener />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
