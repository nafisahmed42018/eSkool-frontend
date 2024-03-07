import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
  
  }),
});


export const {  } = apiSlice;