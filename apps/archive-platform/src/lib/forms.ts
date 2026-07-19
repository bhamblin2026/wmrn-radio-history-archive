import { z } from "zod";

export const submissionSchema = z.object({
  type: z.enum(["correction", "takedown", "research_request", "material_donation", "digital_contribution", "volunteer_interest"]),
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  message: z.string().min(20).max(5000),
  relatedAccessionNumber: z.string().max(80).optional(),
  consentToContact: z.boolean()
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
