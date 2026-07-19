import { NextResponse } from "next/server";
import { roleFromHeader, hasPermission } from "@/src/lib/auth";
import { records } from "@/src/lib/records";

export async function GET(request: Request) {
  const role = roleFromHeader(request.headers.get("x-wmrn-role"));
  if (!hasPermission(role, "records:read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    role,
    records: records.map((record) => ({
      id: record.id,
      accessionNumber: record.accessionNumber,
      title: record.title,
      publicationStatus: record.publicationStatus,
      reviewStatus: record.reviewStatus,
      restrictions: record.restrictions
    }))
  });
}
