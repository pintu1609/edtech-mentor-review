import mongoose, { Schema, models } from "mongoose";

if (mongoose.models.Assignment) {
  delete mongoose.models.Assignment;
}

const AssignmentSchema = new Schema(
  {
    title: String,
    description: String,
    dueDate: Date,
    mentor: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true,
     toJSON: { virtuals: true },
    toObject: { virtuals: true },
   }
  
);

AssignmentSchema.virtual("assignmentsStatus").get(function () {
  if (this.isDeleted) return "deleted";
  if (!this.dueDate) return "open";

  return new Date() > this.dueDate ? "closed" : "open";
});

export const Assignment =
  models.Assignment || mongoose.model("Assignment", AssignmentSchema);
