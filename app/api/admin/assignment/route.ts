import { createAssignment, getAssignments } from "@/backend/controller/admin/admin";

export async function POST(req: Request) {
  return createAssignment(req as any);
}
export async function GET() {
  return getAssignments();
}