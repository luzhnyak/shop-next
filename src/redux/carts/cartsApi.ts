import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import {
  IApiResponse,
  ICart,
  HTTPMethods,
  ApiParams,
  ICartUpdate,
  IAddToCart,
  UpdateCartItemPayload,
} from "../../types";

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart", "Carts"],
  endpoints: (builder) => ({
    getCartByUserId: builder.query<ICart, number>({
      query: (userId) => ({
        url: `/carts/${userId}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: "Cart", id }],
    }),
    getCarts: builder.query<IApiResponse<ICart>, ApiParams>({
      query: (params) => ({
        url: `/carts/`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Carts", id: "LIST" }] : ["Carts"],
    }),
    addToCart: builder.mutation<ICart, IAddToCart>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: `/carts/${body.userId}`,
        body: body,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", userId: userId },
      ],
    }),
    /** 🔹 Оновлення кількості товару в кошику */
    updateCartItem: builder.mutation<ICart, UpdateCartItemPayload>({
      query: ({ id, quantity }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    /** 🔹 Видалення товару з кошика */
    deleteCartItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<ICart, ICartUpdate>({
      query: (body) => ({
        method: HTTPMethods.PUT,
        url: `/carts/${body.id}`,
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Carts", id: "LIST" },
        { type: "Cart", id },
      ],
    }),
    deleteCart: builder.mutation<ICart, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/carts/${id}`,
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartByUserIdQuery,
  useGetCartsQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartsApi;
