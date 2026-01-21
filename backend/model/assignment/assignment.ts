import mongoose, { Schema, models } from "mongoose";

const AssignmentSchema = new Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    mentor: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Assignment =
  models.Assignment || mongoose.model("Assignment", AssignmentSchema);
