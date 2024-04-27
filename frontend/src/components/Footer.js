import React from 'react';
import logo from '../addings/logoNadeem.png'; // Ensure the logo import path is correct
import { FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import './Footer.css'; // This will be your CSS file for styling the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section-group">
          <span>تواصل معنا</span>
          <div className="footer-section">
            <a href="tel:YOUR_PHONE_NUMBER">
              <FaPhone />
            </a>
            <a href="mailto:YOUR_EMAIL_ADDRESS">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-section-group">
          <span>وسائل التواصل</span>
          <div className="footer-section">
            <a href="https://wa.me/YOUR_WHATSAPP_NUMBER">
              <FaWhatsapp />
            </a>
            <a href="https://instagram.com/YOUR_INSTAGRAM">
              <FaInstagram />
            </a>
            <a href="https://facebook.com/YOUR_FACEBOOK_PAGE">
              <FaFacebookF />
            </a>
          </div>
        </div>

        <img src={logo} alt="Nadeem logo" className="logo" />
      </div>
      <div className="footer-bottom-text">
        جميع الحقوق محفوظة © 2024 نجم
      </div>
    </footer>
  );
};

export default Footer;
