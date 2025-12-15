import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, businessName, email, city, message } = body || {};

    if (!email || !businessName) {
      return NextResponse.json(
        { error: "Missing required fields: email, businessName" },
        { status: 400 }
      );
    }

    const h = headers();
    const lead = {
      name: name || "",
      businessName,
      email,
      city: city || "",
      message: message || "",
      createdAt: new Date().toISOString(),
      meta: {
        ip: h.get("x-forwarded-for") || null,
        userAgent: h.get("user-agent") || null,
        referer: h.get("referer") || null,
      },
    };

    const webhook = process.env.LEADS_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "learncity.lead.created", data: lead }),
        });
      } catch (err) {
        console.error("Failed to forward to webhook:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
