import {  z } from "zod";

export const assignmentSchema = z.object({
    title: z.string().min(3).max(30).nonempty("title is required"),
    description: z.string().min(3).max(300).nonempty("description is required"),
    mentor: z.string().nonempty("mentor is required"),
    dueDate: z.string().nonempty("dueDate is required"),
});
