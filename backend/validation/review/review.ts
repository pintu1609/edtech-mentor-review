import {z} from "zod";

export const assignmentMentorReviewSchema = z.object({
    submissionId: z.string().nonempty("Submission is required"),
  feedback: z.string().min(3).max(300).nonempty("Feedback is required"),
  score: z.number().min(0).max(100),
})