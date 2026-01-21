import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/frontend/service/axios";
import ENDPOINTS from "@/frontend/service/endpoint";
import {
  LoginParams,
  RegisterParams,
} from "@/frontend/types/user/userparam";
import { z } from "zod";

// login api call (POST WITH DATA)---
const fetchLogin = async (params: LoginParams) => {
  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.LOGIN,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const tokenSchema = z.string();

  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);
  const token = tokenSchema.parse(data.data.token);

  const dataSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
  });

  const retData = dataSchema.parse(data.data);

  return { status, message, data: retData, token };
};

const useLogin = () => {
  return useMutation({
    mutationKey: ["useLogin"],
    mutationFn: (params: LoginParams) => fetchLogin(params),
  });
};

const fetchRegister = async (params: RegisterParams) => {
  const { data } = await axiosInstance({
    method: "post",
    url: ENDPOINTS.REGISTER,
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  const dataSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
  });

  const retData = dataSchema.parse(data);
  return { status, message, data: retData };
};

const useRegister = () => {
  return useMutation({
    mutationKey: ["useRegister"],
    mutationFn: (params: RegisterParams) => fetchRegister(params),
  });
};

const fetchAllMentor = async () => {
  const { data } = await axiosInstance({
    method: "get",
    url: ENDPOINTS.GETALLMENTOR,
    headers: { "Content-Type": "application/json" },
  });
  const statusSchema = z.number().optional();
  const messageSchema = z.string().optional();
  const status = statusSchema.parse(data.status);
  const message = messageSchema.parse(data.message);

  const dataSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
  });

  const userData = z.array(dataSchema);
  const retData = userData.parse(data.data);
  return { status, message, data: retData };
};

const useGetAllMentor = () => {
  return useQuery({
    queryKey: ["useGetAllMentor"],
    queryFn: () => fetchAllMentor(),
  });
};

// const updateRegisterUser = async (params: UpdateRegisterUser) => {
//   const { data } = await axiosInstance({
//     method: "put",
//     url: `${ENDPOINTS.USER}${params.id}`,
//     data: params.data,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const statusSchema = z.number().optional();
//   const messageSchema = z.string().optional();
//   const status = statusSchema.parse(data.status);
//   const message = messageSchema.parse(data.message);
//   const dataSchema = z.object({
//     name: z.string(),
//     email: z.string(),
//     role: z.string(),
//   });

//   const retData = dataSchema.parse(data.data);

//   return { status, message, data: retData };
// };

// const useUpdateRegisterUser = () => {
//   return useMutation({
//     mutationKey: ["useUpdateRegisterUser"],
//     mutationFn: (params: UpdateRegisterUser) => updateRegisterUser(params),
//   });
// };

// const deletRegisterUser = async (id: string | number) => {
//   const { data } = await axiosInstance({
//     method: "delete",
//     url: `${ENDPOINTS.USER}${id}`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const statusSchema = z.number().optional();
//   const messageSchema = z.string().optional();
//   const status = statusSchema.parse(data.status);
//   const message = messageSchema.parse(data.message);
//   return { status, message };
// };

// const useDeleteRegisterUser = (onSuccess?: () => void) => {
//   return useMutation({
//     mutationKey: ["useDeleteRegisterUser"],
//     mutationFn: (id: string | number) => deletRegisterUser(id),
//     onSuccess: () => {
//       onSuccess?.();
//     },
//   });
// };

export {
  useLogin,
  useRegister,
  useGetAllMentor,
//   useGetAllUser,
//   useUpdateRegisterUser,
//   useDeleteRegisterUser,
};
