import {review  } from "@/backend/controller/mentor/mentor";


export async function PATCH(req: Request) {
  return review(req as any);
}
