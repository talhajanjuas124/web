import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learncity — Learn, Explore, Grow",
  description:
    "Discover local learning, events, and deals in your city. Download the Learncity app or sign up your business.",
  metadataBase: new URL("https://learncity.local"),
  openGraph: {
    title: "Learncity — Learn, Explore, Grow",
    description:
      "Discover local learning, events, and deals in your city. Download the Learncity app or sign up your business.",
    url: "/",
    siteName: "Learncity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learncity — Learn, Explore, Grow",
    description:
      "Discover local learning, events, and deals in your city. Download the Learncity app or sign up your business.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="sticky top-0 z-40 w-full border-b border-black/5 dark:border-white/10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/learncity/logo.svg"
                alt="Learncity"
                width={28}
                height={28}
                priority
                className="rounded-[6px]"
              />
              <span className="font-semibold tracking-tight">
                <span className="text-base">Learn</span>
                <span className="text-base text-brand">city</span>
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/download" className="hover:underline underline-offset-4">
                Download
              </Link>
              <Link
                href="/business"
                className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/15 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                For Business
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100svh-6rem)]">{children}</main>
        <footer className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-black/70 dark:text-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Learncity. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/download" className="hover:underline underline-offset-4">
                Download
              </Link>
              <Link href="/business" className="hover:underline underline-offset-4">
                Business
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
