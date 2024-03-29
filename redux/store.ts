'use client'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/api-slice'
import authSlice from './features/auth/auth-slice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// call the load user function on every page load
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }),
  )
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }),
  )
}

initializeApp()
