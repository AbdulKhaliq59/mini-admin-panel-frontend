import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import type { User } from "../../types/auth";
import type { UserListResponse, CreateUserRequest, UpdateUserRequest, UserStats } from "../../types/user";
import type { User as UserManagement } from "../../types/user";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),
    initiateGoogleAuth: builder.mutation<{ url: string }, void>({
      queryFn: () => {
        const url = `${baseUrl}/auth/google`;
        return { data: { url } };
      },
    }),
    getUsers: builder.query<UserListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/users?page=${page}&limit=${limit}`,
      providesTags: ["Users"],
    }),
    getUserById: builder.query<UserManagement, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation<UserManagement, CreateUserRequest>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<UserManagement, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Users", { type: "Users", id }],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getUserStats: builder.query<UserStats[], void>({
      query: () => "/users/stats/last-7-days",
    }),
    exportUsersProtobuf: builder.query<ArrayBuffer, void>({
      query: () => ({
        url: "/users/export",
        responseHandler: (response) => response.arrayBuffer(),
      }),
    }),
    getPublicKey: builder.query<{ publicKey: string }, void>({
      query: () => "/users/public-key",
    }),
  }),
});

export const {
  useGetProfileQuery,
  useInitiateGoogleAuthMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserStatsQuery,
  useLazyExportUsersProtobufQuery,
  useGetPublicKeyQuery,
} = api;
