import { enquirySchema } from "../../../lib/enquiry";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") || new URL(request.url).host;
  let sameOrigin = !origin;
  if (origin) {
    try {
      const publicOrigin = new URL(origin);
      sameOrigin =
        ["http:", "https:"].includes(publicOrigin.protocol) &&
        (process.env.NEXT_PUBLIC_SITE_URL
          ? publicOrigin.origin ===
            new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
          : publicOrigin.host === host);
    } catch {
      sameOrigin = false;
    }
  }
  if (!sameOrigin)
    return Response.json(
      { message: "This request could not be verified." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return Response.json(
      { message: "Your message is too long." },
      { status: 413 },
    );
  let input;
  try {
    const text = await request.text();
    if (text.length > 16000)
      return Response.json(
        { message: "Your message is too long." },
        { status: 413 },
      );
    input = JSON.parse(text);
  } catch {
    return Response.json(
      { message: "Please check your enquiry." },
      { status: 400 },
    );
  }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success)
    return Response.json(
      { message: "Please check your enquiry details." },
      { status: 400 },
    );
  if (!process.env.RESEND_API_KEY || !process.env.ENQUIRY_FROM_EMAIL)
    return Response.json(
      {
        message:
          "Online enquiries are being set up. Please email curatingframes@gmail.com or call +91 88061 19059. Your message has not been sent.",
      },
      { status: 503 },
    );
  const d = parsed.data;
  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: [process.env.ENQUIRY_TO_EMAIL || "curatingframes@gmail.com"],
        reply_to: d.email,
        subject: `Photography enquiry — ${d.eventType}`,
        text: `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nOccasion: ${d.eventType}\nDate: ${d.eventDate}\nLocation: ${d.location}\n\n${d.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const body = await result.json();
    if (!result.ok || !body.id)
      throw new Error("Provider did not accept email");
    return Response.json({
      message:
        "Your enquiry has been accepted by our email service. Thank you for sharing your story.",
    });
  } catch {
    return Response.json(
      {
        message:
          "Your enquiry could not be sent. Please email curatingframes@gmail.com directly.",
      },
      { status: 502 },
    );
  }
}
