import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import {
  IUserSignUp,
  IUser,
  IUserUpdate,
  IApiResponse,
  HTTPMethods,
  ApiParams,
} from "../../types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getUsers: builder.query<IApiResponse<IUser>, ApiParams>({
      query: (params) => ({
        url: `/users/`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Users", id: "LIST" }] : ["Users"],
    }),
    createUser: builder.mutation<IUser, IUserSignUp>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/users",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation<IUser, IUserUpdate>({
      query: (body) => ({
        method: HTTPMethods.PUT,
        url: `/users/${body.id}`,
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id: "LIST" },
        { type: "User", id },
      ],
    }),
    deleteUser: builder.mutation<IUser, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/users/${id}`,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
