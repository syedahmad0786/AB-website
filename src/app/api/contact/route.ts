import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, quickCaptureSchema } from "@/lib/schemas";
import { appendToGoogleSheets } from "@/lib/google-sheets";
import { sendLeadNotification } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Try full form first, fall back to quick capture
    const fullParse = contactFormSchema.safeParse(body);
    const quickParse = quickCaptureSchema.safeParse(body);

    if (!fullParse.success && !quickParse.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: fullParse.error.flatten(),
        },
        { status: 400 }
      );
    }

    const isFullForm = fullParse.success;
    const formData = isFullForm ? fullParse.data : quickParse.data!;

    const geo = {
      country: request.headers.get("x-visitor-country") || "unknown",
      city: request.headers.get("x-visitor-city") || "unknown",
      region: request.headers.get("x-visitor-region") || "unknown",
    };

    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: isFullForm ? (formData as typeof fullParse.data).phone : undefined,
      company: isFullForm
        ? (formData as typeof fullParse.data).company
        : undefined,
      interest: isFullForm
        ? (formData as typeof fullParse.data).interest
        : (body.source as string) || "other",
      budget: isFullForm
        ? (formData as typeof fullParse.data).budget
        : undefined,
      message: isFullForm
        ? (formData as typeof fullParse.data).message
        : body.message || `Quick inquiry from ${body.source || "website"}`,
      source: body.source,
      geo,
      userAgent: request.headers.get("user-agent") || "",
      referer: request.headers.get("referer") || "",
      timestamp: new Date().toISOString(),
    };

    // Send to Google Sheets and email in parallel
    // Send to Google Sheets and email in parallel
    const results = await Promise.allSettled([
      appendToGoogleSheets(leadData),
      sendLeadNotification(leadData),
    ]);

    // Log any failures but don't fail the request
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(
          `Lead delivery ${i === 0 ? "Sheets" : "Email"} failed:`,
          result.reason
        );
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
