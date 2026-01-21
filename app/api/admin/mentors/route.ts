import { getMentors } from "@/backend/controller/admin/admin";


export async function GET() {
  return getMentors();
}