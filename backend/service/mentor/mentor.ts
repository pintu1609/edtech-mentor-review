import { Assignment } from "@/backend/model/assignment/assignment";
import { Submission } from "@/backend/model/submission/submission";

export const getSubmissions = async (mentorId: string) => {
  const assignments = await Assignment.find(
    {
      mentor: mentorId,
      isDeleted: false,
    },
    { _id: 1 }
  ).lean();

  const assignmentIds = assignments.map(a => a._id);

  const submissions = await Submission.find({
    assignmentId: { $in: assignmentIds },
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "studentId",
      select: "name email",
    })
    .populate({
      path: "assignmentId",
      select: "title dueDate assignmentsStatus description",
    });

  return {
    length: submissions.length,
    data: submissions,
  };
};




export const review = async (mentorId: string, data: any) => {
  const { submissionId, feedback, score } = data;

  const submission = await Submission.findById(submissionId);
  if (!submission) {
    return { success: false, status: 404, message: "Submission not found" };
  }

  const assignment = await Assignment.findById(submission.assignmentId);
  if (!assignment) {
    return { success: false, status: 404, message: "Assignment not found" };
  }

  if (assignment.mentor.toString() !== mentorId) {
    return { success: false, status: 403, message: "Unauthorized assignment" };
  }

  const updated = await Submission.findByIdAndUpdate(
    submissionId,
    { feedback, score, status: "reviewed" },
    { new: true }
  );

  return {
    success: true,
    status: 200,
    data: updated,
  };
};

export const getStats = async (mentorId: string) => {
  const assignments = await Assignment.find(
    {
      mentor: mentorId,
      isDeleted: false,
    },
    { _id: 1 }
  ).lean();

  const assignmentIds = assignments.map(a => a._id);

  const totalSubmissions = await Submission.countDocuments({
    assignmentId: { $in: assignmentIds },
  });

  const reviewed = await Submission.countDocuments({
    assignmentId: { $in: assignmentIds },
    status: "reviewed",
  });

  return {
    totalAssignments: assignmentIds.length,
    totalSubmissions,
    reviewed,
    pending: totalSubmissions - reviewed,
  };
};
