import { User } from "@/backend/model/auth/auth";
import { create, findOne,find } from "@/backend/lib/dal/dal";
import bcrypt from "bcryptjs";
import { generateToken } from "@/backend/lib/helper";

interface interfaceUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "mentor" | "student";
}

interface interfaceLogin {
  email: string;
  password: string;
}

interface interfaceUserResponse {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "mentor" | "student";
}

export const createuser = async (userData: interfaceUser) => {
  const existinguser = await findOne(User, { email: userData.email });
  if (existinguser) {
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  const newuser = await create(User, userData);
  return newuser;
};

export const login = async (user: interfaceLogin) => {
  const existinguser = await findOne(User, { email: user.email });
  if (!existinguser) {
    throw new Error("User does not exist");
  }
  const isPasswordMatch = await bcrypt.compare(
    user.password,
    existinguser.password
  );
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }
  const token = await generateToken(existinguser as interfaceUserResponse);
  const userResponse = {
    id: existinguser._id,
    name: existinguser.name,
    email: existinguser.email,
    role: existinguser.role,
    token,
  };

  return userResponse;
};

export const getAllMentors = async () => {
  const mentors = await find(User, { role: "mentor" });
  return mentors;
};