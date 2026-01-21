import { getStats } from "@/backend/controller/student/student";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getStats(req);
}