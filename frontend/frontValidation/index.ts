import { title } from "process";
import { z } from "zod";
import { de } from "zod/locales";
const initialLogin = {
    email: "",
    password: ""
}
const loginValidationSchema = z.object({
    email: z.string().email().nonempty("email is required"),
    password: z.string().min(8).max(30).nonempty("password is required"),
});

const initialRegister = {
    name: "",
    email: "",
    password: "",
    role: ""
}
const registerValidationSchema = z.object({
    name: z.string().min(3).max(30).nonempty("name is required"),
    email: z.string().email().nonempty("email is required"),
    password: z.string().min(8).max(30).nonempty("password is required"),
    role: z.enum(["admin", "mentor", "student"])
});

const initialAssignment ={
    title:"",
    description:"",
    mentor:"",
    dueDate:"",
    
}
const assignmentValidationSchema = z.object({
    title: z.string().min(3).max(30).nonempty("Name is required"),
    description: z.string().min(3).max(300).nonempty("Description is required"),
    mentor: z.string().min(3).max(30).nonempty("Mentor is required"),
    dueDate: z.string().min(3).max(30).nonempty("DueDate is required"),
})
const initalStudentSubmission={
    content:""
}
const studentSubmissionValidationSchema = z.object({
    content: z.string().min(3).max(300).nonempty("Content is required"),
})

export {initialLogin, loginValidationSchema, initialRegister, registerValidationSchema, initialAssignment, assignmentValidationSchema, initalStudentSubmission, studentSubmissionValidationSchema}