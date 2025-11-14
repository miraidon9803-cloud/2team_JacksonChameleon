import React from 'react'
import { Outlet } from 'react-router-dom'
import FilterPopup from './FilterPopup'
import Header from './Header'
import Footer from './Footer'
import SearchPopup from './SearchPopup'
import { useProductStore } from '../store/ProductStore'

const Layout = () => {
    const { isSearchOpen } = useProductStore();

    return (
        <div>
            <Header/>
            {isSearchOpen && <SearchPopup />}
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Layout