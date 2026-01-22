// backend/controller/mentor.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/backend/lib/authorization";
import * as service from "@/backend/service/mentor/mentor";
import { connectToDatabase } from "@/backend/lib/db";

export const getSubmissions = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const user = verifyToken(req, ["mentor"]);

  const result = await service.getSubmissions(user.id);

  return NextResponse.json({
    status: 201,
    message: "Submissions fetched successfully",
    data: result
  })
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 },
    )
  }
  
};

export const review = async (req: NextRequest) => {
  try {
    await connectToDatabase();
     const user = verifyToken(req, ["mentor"]);

  const body = await req.json();
  console.log("🚀 ~ review ~ body:", body)
  const result = await service.review(user.id, body);
  if (!result.success) {
    return NextResponse.json(
      { message: result.message, status: 400 },
      { status: 400 }
    );
  }

  return NextResponse.json({
    status: 201,
    message: "Review submitted successfully",
    data: result.data
  })
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 },
    )
  }
 
};

export const getStats = async (req: NextRequest) => {
  try {
    await connectToDatabase();
     const user = verifyToken(req);
const result = await service.getStats(user.id);
return NextResponse.json({
  status: 201,
  message: "Stats fetched successfully",
  data: result
})
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch assignments",
      },
      { status: 500 },
    )
  }
 
};
