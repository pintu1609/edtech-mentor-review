import { submit } from "@/backend/controller/student/student";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await submit(req);
}