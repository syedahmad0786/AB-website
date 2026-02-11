import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  interest: z.enum([
    "agentic-ai",
    "voice-ai",
    "content-automation",
    "enterprise-automation",
    "ai-consulting",
    "other",
  ]),
  message: z.string().min(10, "Please tell us a bit more (10+ characters)"),
  budget: z
    .enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"])
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const quickCaptureSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  source: z.string().optional(),
});

export type QuickCaptureData = z.infer<typeof quickCaptureSchema>;
