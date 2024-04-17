import React from 'react';
import '../App.css';
import NadeemLogo from '../addings/nadeem name.png';
import AccountLogo from '../addings/Group 397.png';
import { Link } from 'react-router-dom';


//
const Header = () => {
    return (
        <header className="app-header">
            <div className="header-container">
                {<img src={NadeemLogo} alt="Nadeem" className='header-logo' />}
                <nav className="header-nav">
                    <ul>
                        <li>عن نديم</li>
                        <li>أطفالي</li>
                        <li><Link to="/storypage">قصصي</Link></li>
                        <li><Link to="/">الرئيسية</Link></li>
                    </ul>
                </nav>
                {<img src={AccountLogo} alt="Account" className='account-logo' />}
            </div>
        </header>
    );
};

export default Header;
