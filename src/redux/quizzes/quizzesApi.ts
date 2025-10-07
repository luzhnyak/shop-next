import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQueryWithReauth";

import {
  HTTPMethods,
  ApiParams,
  IQuiz,
  IQuizFull,
  IApiResponse,
  IQuizCreate,
  IQuestionUpdate,
  IQuizUpdate,
  IQuestionCreate,
  QuizResult,
  SendQuiz,
} from "../../types";

export const quizzesApi = createApi({
  reducerPath: "quizzesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Quizzes", "Quiz"],
  endpoints: (builder) => ({
    getQuizById: builder.query<IQuizFull, number>({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: "Quiz", id }, "Quiz"],
    }),
    getCompanyQuizzes: builder.query<IApiResponse<IQuiz>, ApiParams>({
      query: ({ id, ...params }) => ({
        url: `/quizzes/company/${id}`,
        method: HTTPMethods.GET,
        params,
      }),
      providesTags: (result) =>
        result ? [{ type: "Quizzes", id: "LIST" }] : ["Quizzes"],
    }),
    createQuiz: builder.mutation<IQuizFull, IQuizCreate>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/quizzes",
        body: body,
      }),
      invalidatesTags: [{ type: "Quizzes", id: "LIST" }],
    }),
    updateQuiz: builder.mutation<IQuizFull, IQuizUpdate>({
      query: (body) => ({
        method: HTTPMethods.PUT,
        url: `/quizzes/${body.id}`,
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Quizzes", id: "LIST" },
        { type: "Quiz", id },
      ],
    }),
    deleteQuiz: builder.mutation<IQuiz, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/quizzes/${id}`,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Quizzes", id: "LIST" },
        { type: "Quiz", id },
      ],
    }),
    addQuestion: builder.mutation<IQuizFull, IQuestionCreate>({
      query: ({ quiz_id, ...body }) => ({
        method: HTTPMethods.POST,
        url: `/quizzes/${quiz_id}/questions`,
        body: body,
      }),
      invalidatesTags: (result, error, { quiz_id }) => [
        { type: "Quizzes", id: "LIST" },
        { type: "Quiz", id: quiz_id },
      ],
    }),
    updateQuestion: builder.mutation<IQuizFull, IQuestionUpdate>({
      query: ({ id, ...body }) => ({
        method: HTTPMethods.PUT,
        url: `/quizzes/questions/${id}`,
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Quizzes", id: "LIST" },
        { type: "Quiz", id },
        "Quiz",
      ],
    }),
    deleteQuestion: builder.mutation<IQuizFull, number>({
      query: (id) => ({
        method: HTTPMethods.DELETE,
        url: `/quizzes/questions/${id}`,
      }),
      invalidatesTags: [{ type: "Quizzes", id: "LIST" }, "Quiz"],
    }),
    sendQuiz: builder.mutation<QuizResult, SendQuiz>({
      query: (body) => ({
        method: HTTPMethods.POST,
        url: "/quiz_results",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetQuizByIdQuery,
  useGetCompanyQuizzesQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useSendQuizMutation,
} = quizzesApi;
