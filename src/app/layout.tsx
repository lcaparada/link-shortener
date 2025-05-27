import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Encurtador URL",
  description: "Encurte sua url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-200">
        <ReactQueryProvider>
          <main
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200`}
          >
            {children}
          </main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
