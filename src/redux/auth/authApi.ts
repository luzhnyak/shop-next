import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../common/baseQueryWithReauth";
import { resetAuthData, saveAuthData, setUser } from "./authSlice";
import {
  IUserSignIn,
  ITokenResponse,
  IUserSignUp,
  IUser,
  IAuth0TokenRequest,
  IInfoResponse,
  HTTPMethods,
} from "../../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    currentUser: builder.query<IUser, void>({
      query: () => ({
        url: `/auth/me`,
        method: HTTPMethods.GET,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          dispatch(resetAuthData());
        }
      },
    }),
    register: builder.mutation<ITokenResponse, IUserSignUp>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/auth/register",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveAuthData(data.access_token));
        } catch {
          dispatch(resetAuthData());
        }
      },
    }),
    login: builder.mutation<ITokenResponse, IUserSignIn>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/auth/login",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveAuthData(data.access_token));
        } catch {
          dispatch(resetAuthData());
        }
      },
    }),
    refresh: builder.mutation<ITokenResponse, void>({
      query: () => ({
        method: HTTPMethods.POST,
        url: "/auth/refresh",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveAuthData(data.access_token));
        } catch {
          dispatch(resetAuthData());
        }
      },
    }),
    logout: builder.mutation<IInfoResponse, void>({
      query: () => ({
        method: HTTPMethods.POST,
        url: "/auth/logout",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(resetAuthData());
        } catch {
          dispatch(resetAuthData());
        }
      },
    }),
    auth0Login: builder.mutation<ITokenResponse, IAuth0TokenRequest>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/auth/auth0-login",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveAuthData(data.access_token));
        } catch {
          dispatch(resetAuthData());
        }
      },
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useAuth0LoginMutation,
  useLogoutMutation,
} = authApi;
