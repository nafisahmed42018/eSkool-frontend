import { apiSlice } from '../api/api-slice'
import { userLoggedIn, userRegistration } from './auth-slice'

type RegistrationResponse = {
  message: string
  verificationToken: string
}

type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'auth/registration',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(
            userRegistration({
              token: result.data.verificationToken,
            }),
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    activation: builder.mutation({
      query: ({ verificationToken, verificationCode }) => ({
        url: 'auth/activate-user',
        method: 'POST',
        body: {
          verificationToken,
          verificationCode,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: {
          email,
          password,
        },
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
          // console.log(result)
        } catch (error) {
          console.log(error)
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: 'auth/social-auth',
        method: 'POST',
        body: {
          email,
          name,
          avatar,
        },
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
        } catch (error) {
          // console.log(error)
        }
      },
    }),
  }),
})

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
} = authApi
