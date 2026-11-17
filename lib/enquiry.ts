import { z } from "zod";
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s-]{7,25}$/, "Please enter a valid phone number."),
  eventType: z.enum([
    "Wedding",
    "Engagement",
    "Birthday",
    "Celebration",
    "Portraits",
    "Conference shoot",
    "Other",
  ]),
  eventDate: z.iso
    .date("Please select a valid date.")
    .refine(
      (v) =>
        v >=
        new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }),
      "Please choose today or a future date.",
    ),
  location: z
    .string()
    .trim()
    .min(2, "Please enter your event location.")
    .max(200),
  message: z
    .string()
    .trim()
    .min(15, "Tell us a little more (at least 15 characters).")
    .max(4000),
  website: z.string().max(0).optional(),
});
export type Enquiry = z.infer<typeof enquirySchema>;
