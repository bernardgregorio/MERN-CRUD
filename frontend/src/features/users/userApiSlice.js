import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/api/users",
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "User", id })), "User"]
          : ["User"],
    }),

    fetchUserById: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/create",
        method: "POST",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/api/users/update/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    patchUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/api/users/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useLazyFetchUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
