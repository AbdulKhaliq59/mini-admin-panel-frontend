import { api } from './api';
import type { User } from '../../types/auth';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    initiateGoogleAuth: builder.mutation<{ url: string }, void>({
      queryFn: () => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
        return { data: { url } };
      },
    }),
  }),
});

export const { useGetProfileQuery, useInitiateGoogleAuthMutation } = authApi;
