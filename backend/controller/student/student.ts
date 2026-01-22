import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/backend/lib/authorization";
import * as service from "@/backend/service/student/student";
import { connectToDatabase } from "@/backend/lib/db";
import { assignmentSubmissionSchema } from "@/backend/validation/submisson/submission";

export const getAssignments = async (req:
  NextRequest
) => {
  try {
    await connectToDatabase();
    const user = verifyToken( req, ["student"]);
    const data = await service.getAssignments(user.id);
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
     const userData = assignmentSubmissionSchema.parse(body);
    
    console.log("🚀 ~ submit ~ body:", body)

    const result = await service.submit(user.id, userData);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, status: 400 },
        
      );
    }
    return NextResponse.json(
      {
        status: 201,
        message: result.message,
        data: result.data,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit assignment" },
      { status: 500 }
    );
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


export const editSubmission = async (req: NextRequest,id: string) => {
  try {
    await connectToDatabase();
    const user = verifyToken(req, ["student"]);
    const body = await req.json();
         const userData = assignmentSubmissionSchema.parse(body);

    const result = await service.updateSubmission(id, user.id, userData);
    return NextResponse.json({
      status: 201,
      message: "Submission edited successfully",
      data: result.data,
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