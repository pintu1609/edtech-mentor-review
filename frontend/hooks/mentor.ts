import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/frontend/service/axios";
import ENDPOINTS from "@/frontend/service/endpoint";
import { z } from "zod";
import {  studentSubmitAssignmentParams } from "../types/assignment/assignment";


// login api call (POST WITH DATA)---
const reviewSubmission = async (params: studentSubmitAssignmentParams
) => {
  const { data } = await axiosInstance({
    method: "put",
    url: ENDPOINTS.REVIEWSUBMISSION,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(data);
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();

  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  const dataSchema = z.object({
    assignmentId: z.string(),
    studentId: z.string(),
    content: z.string(),
    // mentor: z.string(),
    status: z.string(),
    _id: z.string(),
   
  });

  const retData = dataSchema.parse(data.data);

  return { status, message, data: retData, };
};

const useReviewSubmission = () => {
  return useMutation({
    mutationKey: ["useReviewSubmission"],
    mutationFn: (params: studentSubmitAssignmentParams) => reviewSubmission(params),
  });
};

// get all assignment



const fetchMentorAllAssignments = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETMENTORSUBMISSION,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  
const dataSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  metor: z.string().optional(),
  
});

const userData = z.array(dataSchema);
  const retData = userData.parse(data.data);
  return { status, message, data: retData };
};

const useMentorAllAssignments = () => {
  return useQuery({
    queryKey: ["useMentorAllAssignments"],
    queryFn: () => fetchMentorAllAssignments(),
  });
};




const fetchMentorStats = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETMENTORSTATS,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

const dataSchema = z.object({
  total: z.number(),
  reviewed: z.number(),
  pending: z.number(),
});

  const retData = dataSchema.parse(data.data);
  return { data: retData };
};

const useMentorStats = () => {
  return useQuery({
    queryKey: ["useMentorStats"],
    queryFn: () => fetchMentorStats(),
  });
};

export { useMentorAllAssignments, useMentorStats, useReviewSubmission };