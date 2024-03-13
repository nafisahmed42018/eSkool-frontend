import { redirect } from 'next/navigation'
import React from 'react'
import UserAuth from './user-auth'

interface ProtectedProps {
  children: React.ReactNode
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth()

  return isAuthenticated ? children : redirect('/')
}
