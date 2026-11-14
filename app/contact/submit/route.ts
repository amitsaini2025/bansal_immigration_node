import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name,
      email,
      contact_email,
      phone,
      contact_phone,
      subject,
      message,
      form_source = "website_callback",
      form_variant = "callback",
      website_honeypot,
      bot_field,
    } = body;

    // Spam protection: if honeypot is filled, return success silently
    if (website_honeypot || bot_field) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your call-back request has been received.",
      });
    }

    const leadName = (name || "").trim();
    const leadEmail = (email || contact_email || "").trim();
    const leadPhone = (phone || contact_phone || "").trim();
    const leadSubject = (subject || "General Consultation").trim();
    const leadMessage = (message || "Requested call back from homepage").trim();

    if (!leadName) {
      return NextResponse.json(
        { success: false, message: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!leadPhone && !leadEmail) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid phone number or email address." },
        { status: 400 }
      );
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    const db = getDb();
    await db.execute(
      `INSERT INTO contacts (
        name,
        contact_email,
        contact_phone,
        subject,
        message,
        status,
        form_source,
        form_variant,
        ip_address,
        user_agent,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, 'unread', ?, ?, ?, ?, NOW(), NOW())`,
      [
        leadName,
        leadEmail,
        leadPhone,
        leadSubject,
        leadMessage,
        form_source,
        form_variant,
        ipAddress,
        userAgent,
      ]
    );

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your request has been received. A registered migration agent will contact you shortly.",
    });
  } catch (err) {
    console.error("Error processing contact submission:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "We could not save your request at this moment. Please call our Melbourne office directly on +61 3 9602 1330.",
      },
      { status: 500 }
    );
  }
}
