'use client'
import React, { FC, useState } from 'react'
// import Profile from "../components/Profile/Profile";
import { useSelector } from 'react-redux'
import Header from '@/components/navbar/header'
import Footer from '@/components/footer'
import Protected from '@/hooks/use-protected'
import Profile from '@/components/profile/profile'

type Props = {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(5)
  const [route, setRoute] = useState('Login')
  const { user } = useSelector((state: any) => state.auth)

  return (
    <div className="min-h-screen">
      <Protected>
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  )
}

export default Page
