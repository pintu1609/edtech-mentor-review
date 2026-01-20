import { userLogin } from "@/backend/controller/auth/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await userLogin(req);
}
