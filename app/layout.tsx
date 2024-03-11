'use client'
import type { Metadata } from 'next'
import { Inter, Josefin_Sans, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/utils/theme-provider'
import { HomeMeta } from '@/meta/home-meta'
import { StoreProvider } from './provider'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import Loader from '@/components/loader/loader'
import { useLoadUserQuery } from '@/redux/features/api/api-slice'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin',
})
const metadata: Metadata = HomeMeta

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <StoreProvider>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <UserLogged>{children}</UserLogged>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
const UserLogged: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({})

  return <>{isLoading ? <Loader /> : <div>{children}</div>}</>
}
