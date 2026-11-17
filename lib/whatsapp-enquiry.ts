import type { Enquiry } from "./enquiry";

export function whatsappEnquiryUrl(data: Enquiry) {
  const [year, month, day] = data.eventDate.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  const message = [
    "Hello Curating Frames,",
    "I would like to enquire about your photography and cinematography services for the following event.",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Occasion: ${data.eventType}`,
    `Event date: ${formattedDate}`,
    `Location: ${data.location}`,
    "",
    "Additional details:",
    data.message,
    "",
    "Please share your availability, suitable packages and pricing. Thank you.",
  ].join("\n");
  return `https://wa.me/918806119059?text=${encodeURIComponent(message)}`;
}
