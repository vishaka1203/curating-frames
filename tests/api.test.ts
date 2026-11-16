import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/enquiry/route";
const payload = {
  name: "Test Person",
  email: "test@example.com",
  phone: "+918806119059",
  eventType: "Wedding",
  eventDate: "2099-12-04",
  location: "Test venue",
  message: "A test enquiry for our photography plans.",
  website: "",
};
const request = (body: unknown, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/enquiry", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
test("rejects cross-origin and malformed enquiries", async () => {
  assert.equal(
    (await POST(request(payload, "https://another.example"))).status,
    403,
  );
  assert.equal(
    (await POST(request({ ...payload, email: "invalid" }))).status,
    400,
  );
  assert.equal(
    (await POST(request({ ...payload, website: "spam" }))).status,
    400,
  );
});
test("does not claim delivery without provider configuration", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.ENQUIRY_FROM_EMAIL;
  const response = await POST(request(payload));
  assert.equal(response.status, 503);
  assert.match((await response.json()).message, /has not been sent/);
});
test("requires provider confirmation and handles provider failure", async () => {
  const previousFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = "test-key";
  process.env.ENQUIRY_FROM_EMAIL = "test@example.com";
  try {
    globalThis.fetch = async () =>
      Response.json({ error: "rejected" }, { status: 500 });
    assert.equal((await POST(request(payload))).status, 502);
    globalThis.fetch = async () => Response.json({ id: "test-confirmed" });
    assert.equal((await POST(request(payload))).status, 200);
  } finally {
    globalThis.fetch = previousFetch;
    delete process.env.RESEND_API_KEY;
    delete process.env.ENQUIRY_FROM_EMAIL;
  }
});
test("accepts a matching public Host when Next uses an internal request URL", async () => {
  const response = await POST(
    new Request("http://localhost:3000/api/enquiry", {
      method: "POST",
      headers: {
        host: "127.0.0.1:3000",
        origin: "http://127.0.0.1:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }),
  );
  assert.equal(response.status, 503);
});
