import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/";

export const loginApi = createApi({
  reducerPath: "loginapi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
    recovery: builder.mutation({
      query: (data) => ({
        url: "recover_password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: data.email,
        },
      }),
    }),
    reset: builder.mutation({
      query: (data) => ({
        url: "reset_password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: {
          password: data.password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRecoveryMutation, useResetMutation } = loginApi;
