import { getStats } from "@/backend/controller/mentor/mentor";


export async function GET(req: Request) {
  return getStats(req as any);
}