import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const LIMIT = 3; // max attempts
const WINDOW = 60 * 1000; // 1 minute

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const record = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

    if (now - record.lastRequest < WINDOW) {
      if (record.count >= LIMIT) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      record.count += 1;
    } else {
      record.count = 1;
    }
    record.lastRequest = now;
    rateLimitMap.set(ip, record);

    const { name, email, phone, location, message, nickname } = await req.json();

    // Honeypot check
    if (nickname) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Send confirmation email
    await resend.emails.send({
      from: "info@nouvoayiti2075.com",
      to: email,
      subject: "Welcome to Nouvo Ayiti 2075",
      html: `<p>Dear ${name},</p><p>Thank you for joining us! We’ll be in touch soon.</p>`,
    });

    // Send admin notification
    await resend.emails.send({
      from: "info@nouvoayiti2075.com",
      to: "info@nouvoayiti2075.com",
      subject: "New Membership Request",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
