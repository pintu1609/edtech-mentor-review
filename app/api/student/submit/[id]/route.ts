import { editSubmission } from "@/backend/controller/student/student";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX

  return editSubmission(req, id);
}