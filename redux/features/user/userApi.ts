import { apiSlice } from '../api/api-slice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: 'auth/update-user-avatar',
        method: 'PUT',
        body: { avatar },
        credentials: 'include' as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: 'auth/update-user',
        method: 'PUT',
        body: {
          name,
        },
        credentials: 'include' as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: 'auth/update-password',
        method: 'PUT',
        body: {
          oldPassword,
          newPassword,
        },
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
} = userApi
