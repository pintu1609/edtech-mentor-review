import { connectToDatabase } from "@/backend/lib/db";
import { createuser, login,getAllMentors } from "@/backend/service/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema, userSchema } from "@/backend/validation/auth/auth";

export const createUser = async (req: NextRequest) => {
  await connectToDatabase();

  try {
    const body = await req.json();
    const userData = userSchema.parse(body);
    const result = await createuser(userData);
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      // handle unknown error type
    }
  }
};

export const userLogin = async (req: NextRequest) => {
  await connectToDatabase();
  try {
    const body = await req.json();
    const user = loginSchema.parse(body);
    const result = await login(user);
    return NextResponse.json({
      status: 201,
      message: "User logged in successfully",
      data: {
        id: result.id,
        email: result.email,
        role: result.role,
        name: result.name,
        token: result.token,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      // handle unknown error type
    }
  }
};


export const allMentor = async () => {
  try {
    await connectToDatabase();
    const mentors = await getAllMentors();
    return NextResponse.json({ status: 201, data: mentors , message: "Mentors fetched successfully" });
  } catch (error) {
    console.log(error);
  }
};