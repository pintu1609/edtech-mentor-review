import { z } from "zod";

export const assignmentSubmissionSchema = z.object({
  assignmentId: z.string().nonempty("Assignment is required"),
  content: z.string().min(3).max(300).nonempty("Content is required"),
})
