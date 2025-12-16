import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative isolate px-6 py-24 sm:py-32">
      <HeroBackground />
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn smarter in your city
        </h1>
        <p className="mt-4 text-balance text-base/7 text-black/70 dark:text-white/70">
          Find classes, events, and exclusive deals near you. Download the app
          to explore, or sign up your business to reach local learners.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/download"
            className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-white font-medium shadow-sm hover:opacity-90 transition"
          >
            Download App
          </Link>
          <Link
            href="/business"
            className="inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/15 px-4 py-2.5 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            For Business
          </Link>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <Image
            src="/learncity/app-screenshot.svg"
            alt="Learncity app preview"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl border border-black/10 dark:border-white/15 shadow-sm"
          />
        </div>
        {/* Animated background renders via <HeroCanvas /> */}
      </div>

      <div className="mx-auto mt-16 max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-black/10 dark:border-white/15 p-5">
          <h3 className="font-semibold">Discover</h3>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Courses, workshops, and events curated for your interests.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/15 p-5">
          <h3 className="font-semibold">Save</h3>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Unlock local deals and member-only offers.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/15 p-5">
          <h3 className="font-semibold">Grow</h3>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">
            Level up skills and connect with your community.
          </p>
        </div>
      </div>
    </section>
  );
}
