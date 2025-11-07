import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import {
  IApiResponse,
  HTTPMethods,
  ApiParams,
  IOrder,
  UpdateStatusOrder,
  IOrderCreateFromCart,
  IOrderCreate,
} from "../../types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order", "Orders"],
  endpoints: (builder) => ({
    Checkout: builder.mutation<IOrder, IOrderCreateFromCart>({
      query: (body) => ({
        method: HTTPMethods.POST,
        body,
        url: `/orders/checkout/`,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    CreateOrder: builder.mutation<IOrder, IOrderCreate>({
      query: (body) => ({
        method: HTTPMethods.POST,
        body,
        url: `/orders/`,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getMyOrders: builder.query<IApiResponse<IOrder>, void>({
      query: () => ({
        url: `/orders/my`,
        method: HTTPMethods.GET,
      }),
      providesTags: ["Order"],
    }),
    getOrders: builder.query<IApiResponse<IOrder>, ApiParams>({
      query: (params) => ({
        url: `/orders/`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Orders", id: "LIST" }] : ["Orders"],
    }),
    getOrderById: builder.query<IApiResponse<IOrder>, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, id) => [
        { type: "Orders", id: "LIST" },
        { type: "Order", id },
      ],
    }),
    updateStatusOrder: builder.mutation<IOrder, UpdateStatusOrder>({
      query: (body) => ({
        method: HTTPMethods.PATCH,
        body: { status: body.status },
        url: `/orders/${body.id}`,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Orders", id: "LIST" },
        { type: "Order", id },
      ],
    }),
    deleteOrder: builder.mutation<IOrder, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/orders/${id}`,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateStatusOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
