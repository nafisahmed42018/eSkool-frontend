'use client'
import Footer from '@/components/footer'
import Hero from '@/components/hero/hero'
import Header from '@/components/navbar/header'
import React, { FC, useEffect, useState } from 'react'

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Verification')

  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Footer />
    </>
  )
}

export default Page
