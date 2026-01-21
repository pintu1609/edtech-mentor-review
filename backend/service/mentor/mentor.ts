// backend/service/mentor.ts
import { Submission } from "@/backend/model/submission/submission";

export const getSubmissions = (mentorId: string) =>
  Submission.find({ mentorId }).populate("studentId assignmentId");

export const review = (mentorId: string, data: any) =>
  Submission.findOneAndUpdate(
    { _id: data.submissionId, mentorId },
    { feedback: data.feedback, score: data.score, status: "reviewed" },
    { new: true }
  );

export const getStats = async (mentorId: string) => {
  const total = await Submission.countDocuments({ mentorId });
  const reviewed = await Submission.countDocuments({ mentorId, status: "reviewed" });
  return { total, reviewed, pending: total - reviewed };
};
