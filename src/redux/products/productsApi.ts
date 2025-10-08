import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import {
  IApiResponse,
  IProduct,
  HTTPMethods,
  ApiParams,
  IProductCreate,
  IProductUpdate,
  IProductVisibilityUpdate,
} from "../../types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProductById: builder.query<IProduct, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getProducts: builder.query<IApiResponse<IProduct>, ApiParams>({
      query: (params) => ({
        url: `/products/`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Products", id: "LIST" }] : ["Products"],
    }),
    createProduct: builder.mutation<IProduct, IProductCreate>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/products",
        body: body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<IProduct, IProductUpdate>({
      query: (body) => ({
        method: HTTPMethods.PUT,
        url: `/products/${body.id}`,
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id: "LIST" },
        { type: "Product", id },
      ],
    }),
    updateProductVisibility: builder.mutation<
      IProduct,
      IProductVisibilityUpdate
    >({
      query: (body) => ({
        method: HTTPMethods.PATCH,
        url: `/companies/${body.id}/visibility`,
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id: "LIST" },
        { type: "Product", id },
      ],
    }),
    deleteProduct: builder.mutation<IProduct, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/products/${id}`,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductVisibilityMutation,
  useDeleteProductMutation,
} = productsApi;
