import React from 'react';
import { Link } from 'react-router-dom';

import footerBg from '../assets/images/footer-banner.jpg';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="support">
        <div className="title">Want support?</div>
        <ul>
          <li>
            Please call the number below in U.K and Nepal to make transfer.
          </li>
          <li>UK : +447428292592 | +447516884459 | +447447045052</li>
          <li>NEPAL: +9779886333650</li>
          <li>We are avaiable in Viber, Whatsapp and Facebook Page "NATA".</li>
        </ul>

        <div className="button">Contact Us</div>
      </div>
      <div className="container">
        <div className="list">
          <div className="item">
            <img src={logo} alt="logo" />
            <p>
              Nata Money is registered with FCA (Financial Conduct Authority)
              and HMRC for AML(Anti Money Laundering)
            </p>

            <div className="social-icons">
              <div className="icon">
                <Link to="/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </div>

              <div className="icon">
                <Link to="/">
                  <i className="fab fa-twitter"></i>
                </Link>
              </div>

              <div className="icon">
                <Link to="/">
                  <i className="fab fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="item2">
            <div className="sub-title">Address</div>

            <ul>
              <li>
                <strong>Location:</strong> newroad Kathmandu Nepal
              </li>
              <li>
                <strong>Email:</strong> info@natamoney.com
              </li>
              <li>
                <strong>Phone:</strong> +44 742 829 2592
              </li>
            </ul>
          </div>
          <div className="item3">
            <div className="sub-title">Support</div>

            <ul>
              <li>Money Transfer</li>
              <li>About Team</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
