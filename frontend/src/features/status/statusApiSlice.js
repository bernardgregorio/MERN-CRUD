import { apiSlice } from "../../app/api/apiSlice";

export const statusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStatus: builder.query({
      query: () => "/api/status",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useFetchStatusQuery } = statusApiSlice;
