"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
 

export default function BusinessPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      businessName: String(formData.get("businessName") || ""),
      email: String(formData.get("email") || ""),
      city: String(formData.get("city") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setStatus("success");
      setMessage("Thanks! We'll be in touch soon.");
      form.reset();
    } catch (err: unknown) {
      setStatus("error");
      let errorMessage = "Something went wrong";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setMessage(errorMessage);
    }
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
          Partner with Learncity
        </h1>
        <p className="mt-4 text-center text-black/70 dark:text-white/70">
          List your classes, events, and offers to reach motivated local learners.
        </p>

        <div className="mt-8">
          <Image
            src="/learncity/business-hero.svg"
            alt="Partner with Learncity"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl border border-black/10 dark:border-white/15 shadow-sm"
          />
        </div>

        <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                name="name"
                required
                className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                placeholder="Ayesha Khan"
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="businessName" className="text-sm font-medium">
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                required
                className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                placeholder="Skill Hub"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                placeholder="you@business.com"
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <input
                id="city"
                name="city"
                className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
                placeholder="Lahore, Karachi, Islamabad..."
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="message" className="text-sm font-medium">
              What do you offer?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
              placeholder="Tell us about your classes, events, or deals"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Request a demo"}
            </button>
            {status !== "idle" && (
              <p
                className={
                  status === "success"
                    ? "text-sm text-emerald-600"
                    : status === "error"
                    ? "text-sm text-rose-600"
                    : "text-sm"
                }
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
