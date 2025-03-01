import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  //no need to set baseURL here since proxy is set in vite.config.js
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    const refreshResponse = await baseQuery(
      "/api/auth/refreshToken",
      api,
      extraOptions
    );

    if (refreshResponse?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResponse.data, user }));

      const result = await baseQuery(args, api, extraOptions);

      return result;
    } else {
      api.dispatch(logOut());
      window.location.href = "/login";
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
