import { allMentor } from "@/backend/controller/auth/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await allMentor();
}
