import { z } from "zod";
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

export {initialLogin, loginValidationSchema, initialRegister, registerValidationSchema}