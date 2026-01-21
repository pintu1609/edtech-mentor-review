import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/frontend/service/axios";
import ENDPOINTS from "@/frontend/service/endpoint";
import { z } from "zod";
import { createAssignmentParams } from "../types/assignment/assignment";

// login api call (POST WITH DATA)---
const createAssignment = async (params: createAssignmentParams) => {
  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.CREATEASSIGNMENT,
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
    title: z.string(),
    description: z.string(),
    // mentor: z.string(),
    dueDate: z.string(),
    _id: z.string(),
   
  });

  const retData = dataSchema.parse(data.data);

  return { status, message, data: retData, };
};

const useCreateAssignment = () => {
  return useMutation({
    mutationKey: ["useCreateAssignment"],
    mutationFn: (params: createAssignmentParams) => createAssignment(params),
  });
};

// get all assignment



const fetchAdminAllAssignments = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETASSIGNMENTS,
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
  mentor: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
  }).optional(),
  
});

const userData = z.array(dataSchema);
  const retData = userData.parse(data.data);
  return { status, message, data: retData };
};

const useAdminAllAssignments = () => {
  return useQuery({
    queryKey: ["useAdminAllAssignments"],
    queryFn: () => fetchAdminAllAssignments(),
  });
};


// recent submission



const fetchrecentSubmission = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETRECENTSUBMISSION,
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
  studentId: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    
  }),
  content: z.string(),
  status: z.string(),
  
  
});

const userData = z.array(dataSchema);
  const retData = userData.parse(data.data);
  return { status, message, data: retData };
};

const useRecentSubmission = () => {
  return useQuery({
    queryKey: ["useRecentSubmission"],
    queryFn: () => fetchrecentSubmission(),
  });
};


// mentor overview


const fetchMentorOverview = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETMENTOROVERVIEW,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  
const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
  students: z.number(),
  pending: z.number(),
  
});

const userData = z.array(dataSchema);
  const retData = userData.parse(data.data);
  return { status, message, data: retData };
};

const useMentorOverview = () => {
  return useQuery({
    queryKey: ["useMentorOverview"],
    queryFn: () => fetchMentorOverview(),
  });
};


// admin stats
const fetchAdminStats = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETADMINSTATS,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();

const dataSchema = z.object({
  assignments: z.number(),
  submissions: z.number(),
  pendingReviews: z.number(),
  mentors: z.number(),
});

  const retData = dataSchema.parse(data);
  return { data: retData };
};

const useAdminStats = () => {
  return useQuery({
    queryKey: ["useAdminStats"],
    queryFn: () => fetchAdminStats(),
  });
};

export { useAdminStats, useCreateAssignment,useAdminAllAssignments, useRecentSubmission,useMentorOverview };