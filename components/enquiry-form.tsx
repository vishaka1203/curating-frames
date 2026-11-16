"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type Enquiry } from "@/lib/enquiry";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
export function EnquiryForm() {
  const [feedback, setFeedback] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { website: "" },
  });
  async function submit(data: Enquiry) {
    setFeedback("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setFeedback(
        result.message ||
          "We couldn’t send this enquiry. Please email us directly.",
      );
      if (response.ok) reset();
    } catch {
      setFeedback(
        "We couldn’t send this enquiry. Please email curatingframes@gmail.com directly.",
      );
    }
  }
  const field = (name: keyof Enquiry, label: string, type = "text") => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "phone"
                ? "tel"
                : undefined
        }
      />
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
  return (
    <form noValidate onSubmit={handleSubmit(submit)} className="enquiry-form">
      <div className="form-grid">
        {field("name", "Your name *")}
        {field("email", "Email address *", "email")}
        {field("phone", "Phone number *", "tel")}
        <div className="field">
          <label htmlFor="eventType">What are we celebrating? *</label>
          <select
            id="eventType"
            {...register("eventType")}
            aria-invalid={!!errors.eventType}
            aria-describedby="eventType-error"
          >
            <option value="">Select your occasion</option>
            {[
              "Wedding",
              "Engagement",
              "Birthday",
              "Celebration",
              "Portraits",
              "Other",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          {errors.eventType && (
            <span className="field-error" id="eventType-error">
              Please select an occasion.
            </span>
          )}
        </div>
        {field("eventDate", "Event date *", "date")}
        {field("location", "Event location *")}
      </div>
      <div className="field">
        <label htmlFor="message">Tell us a little about your plans *</label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
        />
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <p className="form-note">
        By enquiring, you agree that we may use these details to respond to your
        request. <a href="/privacy">Privacy details</a>.
      </p>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending your story…" : "Send your enquiry"}
        <ArrowUpRight size={17} />
      </Button>
      <p role="status" className="form-feedback">
        {feedback}
      </p>
    </form>
  );
}
