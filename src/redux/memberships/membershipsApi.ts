import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import { ApiParams, HTTPMethods, IMembership, IApiResponse } from "../../types";

export const membershipsApi = createApi({
  reducerPath: "membershipsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Members",
    "Admins",
    "Membership",
    "Requests",
    "Invite",
    "Invites",
    "Companies",
  ],
  endpoints: (builder) => ({
    addRequest: builder.mutation<IMembership, number>({
      query: (companyId) => ({
        method: HTTPMethods.POST,
        url: `/memberships/company/${companyId}/request`,
      }),
      invalidatesTags: (result, error, companyId) => [
        { type: "Requests", id: "LIST" },
        { type: "Membership", id: companyId },
      ],
    }),
    addInvite: builder.mutation<
      IMembership,
      { companyId: number; userId: number }
    >({
      query: ({ companyId, userId }) => ({
        method: HTTPMethods.POST,
        url: `/memberships/company/${companyId}/invite/${userId}`,
      }),
      invalidatesTags: (result, error, { companyId, userId }) => [
        { type: "Invites", id: "LIST" },
        { type: "Membership", id: companyId },
        { type: "Invite", id: userId },
      ],
    }),
    acceptInvite: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.PATCH,
        url: `/memberships/${membershipId}/accept-invite`,
      }),
      invalidatesTags: (result) => [
        { type: "Invites", id: "LIST" },
        { type: "Members", id: "LIST" },
        { type: "Membership", id: result?.company_id },
      ],
    }),
    acceptRequest: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.PATCH,
        url: `/memberships/${membershipId}/accept-request`,
      }),
      invalidatesTags: (result) => [
        { type: "Requests", id: "LIST" },
        { type: "Members", id: "LIST" },
        { type: "Membership", id: result?.company_id },
      ],
    }),
    cancelInvite: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.DELETE,
        url: `/memberships/${membershipId}/cancel-invite`,
      }),
      invalidatesTags: (result) => [
        { type: "Invites", id: "LIST" },
        { type: "Membership", id: result?.company_id },
      ],
    }),
    cancelRequest: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.DELETE,
        url: `/memberships/${membershipId}/cancel-request`,
      }),
      invalidatesTags: (result) => [
        { type: "Requests", id: "LIST" },
        { type: "Membership", id: result?.company_id },
      ],
    }),
    leaveCompany: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.DELETE,
        url: `/memberships/${membershipId}/leave`,
      }),
      invalidatesTags: (result) => [
        { type: "Companies", id: "LIST" },
        { type: "Members", id: "LIST" },
        { type: "Membership", id: result?.company_id },
      ],
    }),
    removeUserFromCompany: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.DELETE,
        url: `/memberships/${membershipId}/remove`,
      }),
      invalidatesTags: (result, error, membershipId) => [
        { type: "Companies", id: "LIST" },
        { type: "Membership", id: membershipId },
      ],
    }),
    addToAdmin: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.PATCH,
        url: `/memberships/${membershipId}/add-to-admin`,
      }),
      invalidatesTags: (result) => [
        { type: "Members", id: "LIST" },
        { type: "Admins", id: "LIST" },
        { type: "Membership", id: result?.company_id },
      ],
    }),
    removeFromAdmin: builder.mutation<IMembership, number>({
      query: (membershipId) => ({
        method: HTTPMethods.PATCH,
        url: `/memberships/${membershipId}/remove-from-admin`,
      }),
      invalidatesTags: (result, error, membershipId) => [
        { type: "Members", id: "LIST" },
        { type: "Admins", id: "LIST" },
        { type: "Membership", id: membershipId },
      ],
    }),
    getCompanyMembers: builder.query<IApiResponse<IMembership>, ApiParams>({
      query: ({ id, ...params }) => ({
        url: `/companies/${id}/members`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Members", id: "LIST" }] : ["Members"],
    }),
    getAvailableCompanies: builder.query<IApiResponse<IMembership>, ApiParams>({
      query: ({ id, ...params }) => ({
        url: `/users/${id}/available-companies`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Companies", id: "LIST" },
              { type: "Invite", id: id },
            ]
          : ["Companies"],
    }),
    getUserCompanies: builder.query<IApiResponse<IMembership>, ApiParams>({
      query: ({ id, ...params }) => ({
        url: `/users/${id}/companies`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Companies", id: "LIST" }] : ["Companies"],
    }),
    getMembership: builder.query<
      IMembership,
      { companyId: number; userId: number }
    >({
      query: ({ companyId, userId }) => ({
        url: `/memberships/company/${companyId}/user/${userId}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, { companyId }) =>
        result ? [{ type: "Membership", id: companyId }] : ["Membership"],
    }),
  }),
});

export const {
  useAddRequestMutation,
  useAddInviteMutation,
  useAcceptInviteMutation,
  useAcceptRequestMutation,
  useCancelInviteMutation,
  useCancelRequestMutation,
  useLeaveCompanyMutation,
  useRemoveUserFromCompanyMutation,
  useAddToAdminMutation,
  useRemoveFromAdminMutation,
  useGetCompanyMembersQuery,
  useGetMembershipQuery,
  useGetUserCompaniesQuery,
  useGetAvailableCompaniesQuery,
} = membershipsApi;
