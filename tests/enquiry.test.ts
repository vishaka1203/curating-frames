import { test } from "node:test";
import assert from "node:assert/strict";
import { enquirySchema } from "../lib/enquiry";
const valid = {
  name: "A Person",
  email: "person@example.com",
  phone: "+91 8806119059",
  eventType: "Celebration",
  eventDate: "2099-12-04",
  location: "Mumbai",
  message: "We would love to enquire about photography.",
  website: "",
};
test("accepts a complete enquiry", () =>
  assert.equal(enquirySchema.safeParse(valid).success, true));
test("rejects invalid email, past date and spam trap", () => {
  for (const patch of [
    { email: "bad" },
    { eventDate: "2000-01-01" },
    { website: "spam" },
    { message: "x" },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
});
