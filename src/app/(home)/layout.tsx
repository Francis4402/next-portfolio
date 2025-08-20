import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
        <Footer/>
    </div>
  )
}

export default HomeLayout