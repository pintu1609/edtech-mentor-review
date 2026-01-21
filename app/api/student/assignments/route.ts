

import { getAssignments } from "@/backend/controller/student/student";
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
  return await getAssignments();
}