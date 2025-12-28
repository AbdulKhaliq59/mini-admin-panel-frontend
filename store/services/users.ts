import { api } from './api';
import type { UserListResponse, CreateUserRequest, UpdateUserRequest, UserStats } from '../../types/user';
import type { User } from '../../types/user';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/users?page=${page}&limit=${limit}`,
      providesTags: ['Users'],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<User, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ['Users', { type: 'Users', id }],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    getUserStats: builder.query<UserStats[], void>({
      query: () => '/users/stats/last-7-days',
    }),
    getPublicKey: builder.query<{ publicKey: string }, void>({
      query: () => '/users/public-key',
    }),
    exportUsersProtobuf: builder.query<ArrayBuffer, void>({
      query: () => ({
        url: "/users/export",
        responseHandler: (response) => response.arrayBuffer(),
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserStatsQuery,
  useGetPublicKeyQuery,
  useLazyExportUsersProtobufQuery,
} = usersApi;
