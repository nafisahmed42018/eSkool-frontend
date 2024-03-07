import { apiSlice } from '../api/api-slice'
import { userRegistration } from './auth-slice'

type RegistrationResponse = {
  message: string
  verificationToken: string
}

type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
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
  }),
})

export const { useRegisterMutation, useActivationMutation } = authApi
