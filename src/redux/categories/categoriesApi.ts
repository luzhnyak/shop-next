import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import {
  IApiResponse,
  ICategory,
  HTTPMethods,
  ApiParams,
  ICategoryCreate,
} from "../../types";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category", "Categories"],
  endpoints: (builder) => ({
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    getAllCategories: builder.query<IApiResponse<ICategory>, ApiParams>({
      query: (params) => ({
        url: `/categories/all`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Categories", id: "LIST" }] : ["Categories"],
    }),
    getCategories: builder.query<IApiResponse<ICategory>, ApiParams>({
      query: (params) => ({
        url: `/categories/`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Categories", id: "LIST" }] : ["Categories"],
    }),
    createCategory: builder.mutation<ICategory, ICategoryCreate>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/categories",
        body: body,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    updateCategory: builder.mutation<ICategory, ICategory>({
      query: (body) => ({
        method: HTTPMethods.PUT,
        url: `/categories/${body.id}`,
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Categories", id: "LIST" },
        { type: "Category", id },
      ],
    }),
    deleteCategory: builder.mutation<ICategory, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/categories/${id}`,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoryByIdQuery,
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
