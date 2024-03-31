import React from 'react';
import './App.css';
import NadeemLogo from './addings/nadeem name.png';
import AccountLogo from './addings/Group 397.png';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-container">
                {<img src={NadeemLogo} alt="Nadeem" className='header-logo' />}
                <nav className="header-nav">
                    <ul>
                        <li>عن نديم</li>
                        <li>أطفالي</li>
                        <li>قصصي</li>
                        <li>الرئيسية</li>
                    </ul>
                </nav>

                {<img src={AccountLogo} alt="Account" className='account-logo' />}
            </div>
        </header>
    );
};

export default Header;
