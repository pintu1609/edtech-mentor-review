// backend/controller/admin.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/backend/lib/authorization";
import * as service from "@/backend/service/admin/admin";
import { assignmentSchema } from "@/backend/validation/assignment/assignemnt";
import { connectToDatabase } from "@/backend/lib/db";
export const createAssignment = async (req: NextRequest) => {
  try {

  const user = verifyToken(req,["admin"]);
  const body = await req.json();
    const assignmentData = assignmentSchema.parse(body);
 const result= await service.createAssignment(user.id, assignmentData)
 return NextResponse.json({
      status: 201,
      message: "Assignment created successfully",
      data: result
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      // handle unknown error type
    }
  }};

export const getAssignments = async () =>{
  try {
     await connectToDatabase();
    const data = await service.getAssignments();
    return NextResponse.json({
      status: 201,
      message: "Assignments fetched successfully",
      data: data
    });
  } catch (error) {
    console.log(error);
  return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 }
    );
  }
};


export const getSubmissions = async () =>{
  try
  {
    await connectToDatabase();
    const result =await service.getSubmissions();
    return NextResponse.json({
      status: 201,
      message: "Submissions fetched successfully",
      data: result
    })

  }
  catch(error)
  {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 }
    )
  }
}

export const getStats = async () =>
  NextResponse.json(await service.getStats());

export const getMentors = async () =>{
  try
  {
    await connectToDatabase();
    const result = await service.getMentors()
    return NextResponse.json({
      status: 201,
      message: "Mentors fetched successfully",
      data: result
    })
  }
  catch(error)
  {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 }
    )
  }
}
