import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Download Learncity",
  description: "Get the Learncity app on iOS and Android to discover local learning and deals.",
};

export default function DownloadPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Download Learncity</h1>
        <p className="mt-4 text-black/70 dark:text-white/70">
          Available soon on the App Store and Google Play. Join the waitlist and be the first to know when we launch in your city.
        </p>

        <div className="mx-auto mt-10 max-w-4xl">
          <Image
            src="/learncity/app-screenshot.svg"
            alt="Learncity app preview"
            width={1000}
            height={600}
            priority
            className="w-full h-auto rounded-2xl border border-black/10 dark:border-white/15 shadow-sm"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            aria-label="Download on the App Store"
            className="inline-flex"
          >
            <Image
              src="/learncity/appstore-badge.svg"
              alt="Download on the App Store"
              width={180}
              height={54}
              className="h-[54px] w-auto"
            />
          </a>
          <a
            href="#"
            aria-label="Get it on Google Play"
            className="inline-flex"
          >
            <Image
              src="/learncity/playstore-badge.svg"
              alt="Get it on Google Play"
              width={180}
              height={54}
              className="h-[54px] w-auto"
            />
          </a>
        </div>

        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          Businesses? <Link href="/business" className="underline underline-offset-4">Partner with us →</Link>
        </p>
      </div>
    </section>
  );
}
