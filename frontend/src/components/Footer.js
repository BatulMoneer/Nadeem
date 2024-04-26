import React from "react";
import "./Footer.css"; // Assuming you create a separate CSS file for the footer
import footer from "../addings/Footer.png"
import logo from "../addings/logoNadeem.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <img src={footer} alt="first" className='footer' />
        <p>تواصل معانا</p>

        <p>حقوق النشر © 2024 نديم. جميع الحقوق محفوظة.</p>
        <img src={logo} alt="first" className='logo' />
      </div>
    </footer>
  );
};

export default Footer;
