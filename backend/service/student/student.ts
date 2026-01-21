// backend/service/student.ts
import { Assignment } from "@/backend/model/assignment/assignment";
import { Submission } from "@/backend/model/submission/submission";

export const getAssignments = () => Assignment.find();

export const submit = (studentId: string, data: any) =>
  Submission.create({ ...data, studentId });

export const getSubmissions = (studentId: string) =>
  Submission.find({ studentId }).populate("assignmentId mentorId");

export const getStats = async (studentId: string) => {
  const totalAssignments = await Assignment.countDocuments();
  const total = await Submission.countDocuments({ studentId });
  const reviewed = await Submission.countDocuments({ studentId, status: "reviewed" });
  return {totalAssignments, totalSubmissions: total, reviewed, pending: total - reviewed };
};
