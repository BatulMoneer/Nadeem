import React from "react";
import logo from "../addings/logoNadeem.png"; // Ensure the logo import path is correct
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import "./Footer.css"; // This will be your CSS file for styling the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section-group">
          <span>تواصل معنا</span>
          <div className="footer-section">
            <a href="tel:+966535891021">
              <FaPhone />
            </a>
            <a href="mailto:teamnadeemstory@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-section-group">
          <span>وسائل التواصل</span>
          <div className="footer-section">
            <a href="https://wa.me/966535891021">
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
      <div className="footer-bottom-text">جميع الحقوق محفوظة © 2024 نديم</div>
    </footer>
  );
};

export default Footer;
