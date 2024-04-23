import React, { useState } from 'react';
import './Header.css';
import NadeemLogo from '../addings/nadeem name.png';
import AccountLogo from '../addings/Group 397.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="app-header">
            <div className="header-container">
                {/* When the menu icon is clicked, toggle the menu */}
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <img src={NadeemLogo} alt="Nadeem" className='header-logo' />
                {/* Apply the 'open' class based on the isOpen state */}
                <nav className={`header-nav ${isOpen ? "open" : ""}`}>
                    <ul>
                        {/* Close the menu when a list item is clicked */}
                        <li onClick={closeMenu}><Link to="/about">عن نديم</Link></li>
                        <li onClick={closeMenu}><Link to="/children">أطفالي</Link></li>
                        <li onClick={closeMenu}><Link to="/storypage">قصصي</Link></li>
                        <li onClick={closeMenu}><Link to="/">الرئيسية</Link></li>
                        <li onClick={closeMenu}><Link to="/SetPreferences">انشاء قصة</Link></li>
                    </ul>
                    <img src={AccountLogo} alt="Account" className='account-logo' />
                </nav>
            </div>
        </header>
    );
};

export default Header;
