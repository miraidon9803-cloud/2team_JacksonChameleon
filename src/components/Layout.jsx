import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Header from './Header'


const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
     
    </div>
  )
}

export default Layout