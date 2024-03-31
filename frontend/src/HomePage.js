import React from 'react';
import Header from './Header';
import './App.css'; // Importing our custom CSS

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="min-height-content">
                <Header />
            </div>
        </div>
    );
};

export default HomePage;
