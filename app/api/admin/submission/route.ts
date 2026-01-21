import { getSubmissions } from "@/backend/controller/admin/admin";


export async function GET() {
  return getSubmissions();
}