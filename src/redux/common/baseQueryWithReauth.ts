import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { resetAuthData, saveAuthData } from "../auth/authSlice";
import { RootState } from "../store";

const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
const isProd = process.env.NEXT_PUBLIC_PROD!;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: isProd ? "include" : undefined,
  fetchFn: (input: RequestInfo, init?: RequestInit) => {
    return fetch(input, {
      ...init,
    });
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", credentials: "include" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newToken = (refreshResult.data as { access_token: string })
        .access_token;

      api.dispatch(saveAuthData(newToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuthData());
    }
  }

  return result;
};
