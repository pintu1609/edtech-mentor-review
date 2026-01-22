import { deleteAssignment } from "@/backend/controller/admin/admin";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX

  return deleteAssignment(req, id);
}