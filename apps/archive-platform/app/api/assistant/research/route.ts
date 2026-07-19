import { NextResponse } from "next/server";
import { z } from "zod";
import { answerGroundedQuestion } from "@/src/lib/assistant";

const bodySchema = z.object({
  question: z.string().min(3).max(1000)
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "A short research question is required." }, { status: 400 });
  }

  return NextResponse.json(answerGroundedQuestion(parsed.data.question));
}
