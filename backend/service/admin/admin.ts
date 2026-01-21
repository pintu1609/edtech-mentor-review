// backend/service/admin.ts
import { Assignment } from "@/backend/model/assignment/assignment";
import { Submission } from "@/backend/model/submission/submission";
import { User } from "@/backend/model/auth/auth";

export const createAssignment = (adminId: string, data: any) =>
  Assignment.create({ ...data, createdBy: adminId });

export const getAssignments = () => Assignment.find().populate({
  path: "mentor",
  select: "-password",}).populate(
  { path: "createdBy", select: "-password",});

export const getSubmissions = () =>
  Submission.find().populate("studentId mentorId assignmentId");

export const getStats = async () => ({
  assignments: await Assignment.countDocuments(),
  submissions: await Submission.countDocuments(),
  pendingReviews: await Submission.countDocuments({ status: "submitted" }),
  mentors: await User.countDocuments({ role: "mentor" }),
});

export const getMentors = async () => {
  const mentors = await User.find({ role: "mentor" });
  return Promise.all(
    mentors.map(async (m) => ({
      id: m._id,
      name: m.name,
      students: await Submission.distinct("studentId", { mentorId: m._id }).then(r => r.length),
      pending: await Submission.countDocuments({ mentorId: m._id, status: "submitted" }),
    }))
  );
};
