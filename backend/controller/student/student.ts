// backend/controller/student.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/backend/lib/authorization";
import * as service from "@/backend/service/student/student";
import { connectToDatabase } from "@/backend/lib/db";

export const getAssignments = async () => {
  try {
    await connectToDatabase();
    const data = await service.getAssignments();
    return NextResponse.json({
      status: 201,
      message: "Assignments fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 },
    );
  }
};

export const submit = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const user = verifyToken(req, ["student"]);
  
    const body = await req.json();
const result = await service.submit(user.id, body)

    return NextResponse.json(
      {
        status: 201,
        message: "Assignment submitted successfully",
        data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissions = async (req: NextRequest) => {
  try {
    await connectToDatabase()
    const user = verifyToken(req);
    const result = await service.getSubmissions(user.id);
    return NextResponse.json({
      status: 201,
      message: "Submission fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 },
    );
  }
};
export const getStats = async (req: NextRequest) => {
  try{
    await connectToDatabase();
     const user = verifyToken(req);
  const result = await service.getStats(user.id);
  return NextResponse.json({
    status: 201,
    message: "Stats fetched successfully",
    data: result
  })
  }catch(error){
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 },
    );

  }
 
};
