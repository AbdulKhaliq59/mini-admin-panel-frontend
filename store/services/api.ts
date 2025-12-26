import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenService } from "../../utils/token";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = TokenService.getToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => "/auth/profile",
    }),
  }),
});

export const { useGetProfileQuery } = api;
