import React from 'react'
import { Link } from 'react-router-dom'
import "./scss/header.scss"



const menus = [
    { key: "shop", label: "SHOP" },
    { key: "collections", label: "COLLECTIONS" },
    { key: "service", label: "SERVICE" },
    { key: "about", label: "ABOUT" },
    { key: "community", label: "COMMUNITY" }
]

const Header = () => {
    return (
        <header>
            <div className="wide-inner">
                <div className="inner">
                    <div className="header-left">
                        <ul className="main-menu">
                            {menus.map((menu, id) => (
                                <li key={id}> <Link to={`/${menu.key}`}> {menu.label}</Link></li>
                            ))}
                        </ul>
                        <h1 className="logo"><Link to="/"><img src="./images/logo.png" alt="" /> </Link></h1>
                    </div>
                    <div className="header-right">
                        <ul className="gnb-list">
                            <li><Link to="/Search"><img src="./images/search-icon.png" alt="" /></Link></li>
                            <li><Link to="/logjoin"><img src="./images/user-icon.png" alt="" /></Link></li>
                            <li><Link to="/shoppingbags"><img src="./images/shopping-bag-icon.png" alt="" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header