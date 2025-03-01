import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/create",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyToken: builder.query({
      query: () => ({
        url: "/api/auth/verifyToken",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRefreshTokenQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogOutMutation,
  useVerifyTokenQuery,
} = authApiSlice;
