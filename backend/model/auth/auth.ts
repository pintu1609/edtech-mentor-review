import mongoose, { Schema, models } from "mongoose";


const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "mentor", "student"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User =  models.User || mongoose.model("User", UserSchema);
