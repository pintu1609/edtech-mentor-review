// backend/model/submission.ts
import mongoose, { Schema, models } from "mongoose";

const SubmissionSchema = new Schema(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment" },
    studentId: { type: Schema.Types.ObjectId, ref: "User" },
    mentorId: { type: Schema.Types.ObjectId, ref: "User" },

    content: String,
    feedback: String,
    score: Number,

    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

export const Submission =
  models.Submission || mongoose.model("Submission", SubmissionSchema);
