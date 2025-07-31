import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "@/context/ChildContext";
import { checkChildProfileExists } from "@/lib/auth-utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parentlytics - AI-Powered Parental Development",
  description: "Track your child's emotional, mental, and physical development with AI-powered insights and personalized guidance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check authentication and profile status on the server
  const profileStatus = await checkChildProfileExists();

  return (
    <html lang="ka">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full pt-17">{/* pt-20 = 5rem, matches Navbar height */}
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
