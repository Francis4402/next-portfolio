import React from 'react'
import Navbar from '../components/Navbar'

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default HomeLayout