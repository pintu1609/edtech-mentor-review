import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/frontend/service/axios";
import ENDPOINTS from "@/frontend/service/endpoint";
import { z } from "zod";
import {  studentSubmitAssignmentParams } from "../types/assignment/assignment";


// login api call (POST WITH DATA)---
const submitAssignment = async (params: studentSubmitAssignmentParams
) => {
  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.SUBMITASSIGNMENT,
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

const useSubmitAssignment = () => {
  return useMutation({
    mutationKey: ["useSubmitAssignment"],
    mutationFn: (params: studentSubmitAssignmentParams) => submitAssignment(params),
  });
};

// get all assignment



const fetchStudentAllAssignments = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.VIEWASSIGNEMNT,
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

const useStudentAllAssignments = () => {
  return useQuery({
    queryKey: ["useStudentAllAssignments"],
    queryFn: () => fetchStudentAllAssignments(),
  });
};



// student submission



const fetchStudentSubmission = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.STUDENTSUBMISSION,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  
const dataSchema = z.object({
  _id: z.string(),
  assignmentId: z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  createdBy: z.string().optional(),
  
}),
  studentId: z.string(),
  content: z.string(),
  status: z.string(),
  
  
});

const userData = z.array(dataSchema);
  const retData = userData.parse(data.data);
  return { status, message, data: retData };
};

const useStudentSubmission = () => {
  return useQuery({
    queryKey: ["useStudentSubmission"],
    queryFn: () => fetchStudentSubmission(),
  });
};


const fetchStudentStats = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.STUDENTSTATS,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

const dataSchema = z.object({
  totalAssignments: z.number(),
  totalSubmissions: z.number(),
  reviewed: z.number(),
  pending: z.number(),
});

  const retData = dataSchema.parse(data.data);
  return { data: retData };
};

const useStudentStats = () => {
  return useQuery({
    queryKey: ["useStudentStats"],
    queryFn: () => fetchStudentStats(),
  });
};

export { useStudentStats, useSubmitAssignment,useStudentAllAssignments, useStudentSubmission };