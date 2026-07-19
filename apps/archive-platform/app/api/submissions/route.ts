import { NextResponse } from "next/server";
import { submissionSchema } from "@/src/lib/forms";

export async function POST(request: Request) {
  const parsed = submissionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Submission validation failed.", details: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json(
    {
      status: "queued_for_review",
      submissionType: parsed.data.type,
      publicDisclosure: "Private contact information is never shown on public records.",
      nextStep: "Archivist review and malware scanning before any file is processed."
    },
    { status: 202 }
  );
}
