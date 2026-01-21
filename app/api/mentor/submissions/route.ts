import { getSubmissions } from "@/backend/controller/mentor/mentor";


export async function GET(req: Request) {
  return getSubmissions(req as any);
}
