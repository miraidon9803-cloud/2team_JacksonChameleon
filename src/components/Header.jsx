import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/Header.scss'

const menus = [
    {
        key: "shop", label: "SHOP",
        sub: [
            { key: 'all', label: 'All' },
            {
                key: 'sofa', label: 'Sofas',
                sub: [
                    { key: "fabric", label: 'Sofas/Fabric' },
                    { key: "leather", label: 'Sofas/Leather' }
                ]
            },
            {
                key: 'table', label: 'Tables',
                sub: [
                    { key: "Dining", label: 'Tables/Dining' },
                    { key: 'Side', label: 'Tables/Side' },
                    { key: 'Sofa', label: 'Tables/Sofa' }
                ]
            },
            {
                key: 'chair', label: 'Chairs',
                sub: [
                    { key: 'Dining', label: 'Chairs/Dining' },
                    { key: 'Lounge', label: 'Chairs/Lounge' },
                    { key: 'Bench', label: 'Chairs/Bench' }
                ]
            },
            {
                key: 'lighting', label: 'Lighting',
                sub: [
                    { key: 'Table Lamp', label: 'Lighting/Table Lamp' },
                    { key: 'Floor Lamp', label: 'Lighting/Floor Lamp' }
                ]
            }
        ]
    },
    {
        key: "Collections", label: "COLLECTIONS",
        sub: [
            { key: 'ink', label: 'Ink' },
            { key: 'pebble', label: 'Pebble' },
            { key: 'clay', label: 'Clay' },
            { key: 'round', label: 'Round' },
            { key: 'plato', label: 'Plato' }
        ]
    },
    { key: "Service", label: "SERVICE" },
    {
        key: "About", label: "ABOUT",
        sub: [
            { key: 'Brand', label: 'Brand' },
            { key: 'Stories', label: 'Stories' }
        ]
    },
    {
        key: "Community", label: "COMMUNITY",
        sub: [
            { key: 'Notice', label: 'Notice' },
            { key: 'Customer Service', label: 'Customer Service' },
            { key: 'Store', label: 'Store' },
        ]
    }
];

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [height, setHeight] = useState(70);
    const headerRef = useRef(null);
    const submenuRef = useRef({});

    useEffect(() => {
        if (activeMenu && submenuRef.current[activeMenu]) {
            const subMenu = submenuRef.current[activeMenu];
            const subMenuHeight = subMenu.scrollHeight;
            setHeight(70 + subMenuHeight);
        } else {
            setHeight(70);
        }
    }, [activeMenu]);



    return (
        <header ref={headerRef}
        className={activeMenu ? 'active' : ''}

        style={{'--header-height' : `${height}px`}}>

            <div className="header-wrap">

                <ul className="main-menu">
                    {menus.map((menu) => (
                        <li key={menu.key}
                            onMouseEnter={() => menu.sub && setActiveMenu(menu.key)}
                            onMouseLeave={() => menu.sub && setActiveMenu(null)} >

                            <Link to={`/${menu.key}`}>{menu.label}</Link>

                            {menu.sub && (
                                <div className="sub-menu-depth"
                                 ref={el => (submenuRef.current[menu.key] = el)}>
                                    <ul>
                                        {menu.sub.map(sub => (
                                            <li key={sub.key}>
                                                <Link to={`/${menu.key}/${sub.key}`}>{sub.label}</Link>

                                                {sub.sub && (
                                                    <div className="sub-sub-menu-depth">
                                                        <ul>
                                                            {sub.sub.map(third => (
                                                                <li key={third.key}>
                                                                    <Link to={`/${menu.key}/${sub.key}/${third.key}`}>
                                                                        {third.key}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </li>
                    ))}
                </ul>

                <h1 className="logo">
                    <Link to="/"><img src="/images/logo.png" alt="logo" /></Link>
                </h1>

                <ul className="gnb-list">
                    <li><Link to="/Search"><img src="/images/search-icon.png" alt="search" /></Link></li>
                    <li><Link to="/logjoin"><img src="/images/user-icon.png" alt="user" /></Link></li>
                    <li><Link to="/ShoppingBag"><img src="/images/shopping-bag-icon.png" alt="bag" /></Link></li>
                </ul>
            </div>
        </header >
    );
};

export default Header;