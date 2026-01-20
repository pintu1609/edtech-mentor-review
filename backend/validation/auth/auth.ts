import { email, z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(30).nonempty("name is required"),
  email: z.string().email().nonempty("email is required"),
  password: z.string().min(8).max(30).nonempty("password is required"),
  role: z.enum(["admin", "mentor", "student"])
});

export const loginSchema = z.object({
  email: z.string().email().nonempty("email is required"),
  password: z.string().min(8).max(30).nonempty("password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateUserInput = z.infer<typeof userSchema>;
