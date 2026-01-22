import { Assignment } from "@/backend/model/assignment/assignment";
import { Submission } from "@/backend/model/submission/submission";
import mongoose from "mongoose";

export const getAssignments = async (studentId: string) => {
  const submittedAssignmentIds = await Submission.find(
    { studentId },
    { assignmentId: 1 },
  ).lean();

  const submittedIds = submittedAssignmentIds.map((s) => s.assignmentId);

  const assignments = await Assignment.find({
    isDeleted: false,
    _id: { $nin: submittedIds },
  }).sort({ createdAt: -1 });

  return {
    length: assignments.length,
    data: assignments,
  };
};

export const submit = async (studentId: string, data: any) => {
  const { assignmentId } = data;

  const alreadySubmitted = await Submission.findOne({
    studentId,
    assignmentId,
  });

  if (alreadySubmitted) {
    return {
      success: false,
      status: 400,
      message: "Assignment already submitted",
    };
  }

  const submission = await Submission.create({
    ...data,
    studentId,
  });

  return {
    success: true,
    status: 201,
    message: "Assignment submitted successfully",
    data: submission,
  };
};

export const getSubmissions = async (studentId: string) => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return { length: 0, data: [] };
  }

  const now = new Date();

  const data = await Submission.aggregate([
    {
      $match: {
        studentId: new mongoose.Types.ObjectId(studentId),
      },
    },

    {
      $lookup: {
        from: "assignments",
        localField: "assignmentId",
        foreignField: "_id",
        as: "assignment",
      },
    },
    { $unwind: "$assignment" },

    { $match: { "assignment.isDeleted": false } },

    {
      $addFields: {
        "assignment.assignmentsStatus": {
          $cond: [
            { $eq: ["$assignment.isDeleted", true] },
            "deleted",
            {
              $cond: [{ $gt: [now, "$assignment.dueDate"] }, "closed", "open"],
            },
          ],
        },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "assignment.mentor",
        foreignField: "_id",
        as: "mentor",
      },
    },
    {
      $unwind: {
        path: "$mentor",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        assignmentId: 1,
        studentId: 1,
        content: 1,
        status: 1,
        score: 1,
        feedback: 1,
        createdAt: 1,
        updatedAt: 1,

        assignment: {
          _id: "$assignment._id",
          title: "$assignment.title",
          description: "$assignment.description",
          dueDate: "$assignment.dueDate",
          assignmentsStatus: "$assignment.assignmentsStatus",
        },

        mentor: {
          _id: "$mentor._id",
          name: "$mentor.name",
          email: "$mentor.email",
        },
      },
    },

    { $sort: { createdAt: -1 } },
  ]);

  return {
    length: data.length,
    data,
  };
};

export const getStats = async (studentId: string) => {
  const totalAssignments = await Assignment.countDocuments({
    isDeleted: false,
  });

  const submissionStats = await Submission.aggregate([
    {
      $match: {
        studentId: new mongoose.Types.ObjectId(studentId),
      },
    },
    {
      $lookup: {
        from: "assignments",
        localField: "assignmentId",
        foreignField: "_id",
        as: "assignment",
      },
    },
    { $unwind: "$assignment" },
    {
      $match: {
        "assignment.isDeleted": false,
      },
    },
    {
      $group: {
        _id: null,
        totalSubmissions: { $sum: 1 },
        reviewed: {
          $sum: {
            $cond: [{ $eq: ["$status", "reviewed"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalSubmissions: 1,
        reviewed: 1,
        pending: {
          $subtract: ["$totalSubmissions", "$reviewed"],
        },
      },
    },
  ]);

  return {
    totalAssignments,
    totalSubmissions: submissionStats[0]?.totalSubmissions ?? 0,
    reviewed: submissionStats[0]?.reviewed ?? 0,
    pending: submissionStats[0]?.pending ?? 0,
  };
};

export const updateSubmission = async (
  id: string,
  studentId: string,
  data: any,
) => {
  const submission = await Submission.findOne({
    _id: id,
    studentId,
  });

  if (!submission) {
    return {
      success: false,
      status: 404,
      message: "Submission not found",
    };
  }

  const updatedSubmission = await Submission.findOneAndUpdate(
    {
      _id: id,
      studentId,
    },
    data,
    { new: true },
  );

  return {
    success: true,
    data: updatedSubmission,
  };
};
