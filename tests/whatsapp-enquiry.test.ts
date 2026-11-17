import { test } from "node:test";
import assert from "node:assert/strict";
import { whatsappEnquiryUrl } from "../lib/whatsapp-enquiry";

test("WhatsApp enquiry targets the studio and preserves every field and special character", () => {
  const data = {
    name: "A & B",
    email: "hello@example.com",
    phone: "+91 1234567890",
    eventType: "Wedding" as const,
    eventDate: "2099-12-04",
    location: "Pune & Mumbai",
    message: "Our plans include music, family & friends.\nThank you!",
    website: "",
  };
  const url = new URL(whatsappEnquiryUrl(data));
  assert.equal(url.origin + url.pathname, "https://wa.me/918806119059");
  assert.equal([...url.searchParams.keys()].join(), "text");
  const message = url.searchParams.get("text")!;
  assert.ok(message.includes("Event date: 04/12/2099"));
  assert.ok(
    message.includes(
      "Please share your availability, suitable packages and pricing.",
    ),
  );
  for (const [key, value] of Object.entries(data)) {
    if (key !== "website" && key !== "eventDate")
      assert.ok(message.includes(value));
  }
});

test("conference shoot is accepted as an enquiry occasion", async () => {
  const { enquirySchema } = await import("../lib/enquiry");
  const result = enquirySchema.safeParse({
    name: "Event organiser",
    email: "events@example.com",
    phone: "1234567890",
    eventType: "Conference shoot",
    eventDate: "2099-01-09",
    location: "Panjim",
    message: "Photography for our annual conference.",
    website: "",
  });
  assert.equal(result.success, true);
});
