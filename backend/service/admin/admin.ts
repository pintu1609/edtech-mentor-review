// backend/service/admin.ts
import { Assignment } from "@/backend/model/assignment/assignment";
import { Submission } from "@/backend/model/submission/submission";
import { User } from "@/backend/model/auth/auth";
import * as dal from "@/backend/lib/dal/dal";

export const createAssignment = async (adminId: string, data: any) => {
  const assignment = await Assignment.create({
    ...data,
    createdBy: adminId,
    isDeleted: false,
  });

  return assignment;
};

export const getAssignments = async() => {
  const assignemntData=await Assignment.find().populate({
  path: "mentor",
  select: "-password",}).populate(
  { path: "createdBy", select: "-password",})

  return {
    length: assignemntData.length,
    data: assignemntData,
  };

}

export const getSubmissions = async () => {
  const submissions = await Submission.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate({
      path: "studentId",
      select: "-password",
    })
    .populate({
      path: "mentorId",
      select: "-password",
    })
    .populate({
      path: "assignmentId",
    });

  return {
    length: submissions.length,
    data: submissions,
  };
};


export const getStats = async () => ({
  assignments: await Assignment.countDocuments(),
  submissions: await Submission.countDocuments(),
  pendingReviews: await Submission.countDocuments({ status: "submitted" }),
  mentors: await User.countDocuments({ role: "mentor" }),
});

export const getMentors = async () => {
  const mentors = await User.find({ role: "mentor" }).select("name");

  const data = await Promise.all(
    mentors.map(async (mentor) => {
      // 1️⃣ Total assignments assigned to mentor
      const totalAssignments = await Assignment.countDocuments({
        mentor: mentor._id,
        isDeleted: false,
      });

      // 2️⃣ Submission-based stats (via assignment → mentor)
      const stats = await Submission.aggregate([
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
            "assignment.mentor": mentor._id,
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
            students: { $addToSet: "$studentId" },
          },
        },
        {
          $project: {
            _id: 0,
            totalSubmissions: 1,
            reviewed: 1,
            totalStudents: { $size: "$students" },
            pending: {
              $subtract: ["$totalSubmissions", "$reviewed"],
            },
          },
        },
      ]);

      return {
        id: mentor._id,
        name: mentor.name,
        totalAssignments,
        totalSubmissions: stats[0]?.totalSubmissions ?? 0,
        totalStudents: stats[0]?.totalStudents ?? 0,
        reviewed: stats[0]?.reviewed ?? 0,
        pending: stats[0]?.pending ?? 0,
      };
    })
  );

  return {
    length: data.length,
    data,
  };
};



export const Delete= async(id:string)=>{
  const deletedAssignment= await dal.findOneAndUpdate(Assignment,{ _id: id },          // filter
    { isDeleted: true }  )
     return deletedAssignment;


}