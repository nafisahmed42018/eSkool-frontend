import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../auth/auth-slice'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: 'auth/refresh-token',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: 'auth/me',
        method: 'GET',
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            }),
          )
          console.log(result)
        } catch (error) {
          // console.log(error)
        }
      },
    }),
  }),
})

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice
