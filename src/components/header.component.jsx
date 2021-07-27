import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

import { url } from '../url';

import { TokenContext } from '../context/token.context';

const Header = () => {
  const { changeToken, token } = useContext(TokenContext);

  const [sticky, setSticky] = useState(0);
  const [sideNavOpen, setSideNavOpen] = useState(false);

  window.onscroll = () => {
    window.scrollY > 180 ? setSticky(true) : setSticky(false);
  };

  const openNavFunction = () => {
    setSideNavOpen(!sideNavOpen);
  };

  useEffect(() => {
    changeToken(localStorage.getItem('token'));
  }, [changeToken]);

  const logout = () => {
    fetch(url + '/logout/', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Token ' + token,
      }),
    }).then(() => {
      changeToken(null);
      localStorage.clear();
    });
  };

  return (
    <>
      <div className={`side-nav-bg ${sideNavOpen ? 'show' : ''}`}></div>
      <header className={`${sticky ? 'sticky' : ''}`}>
        <div className="header">
          <div className={`nav ${sideNavOpen ? 'side-nav' : ''}`}>
            <ul>
              <li>
                <Link to="/" onClick={() => openNavFunction(true)}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" onClick={() => openNavFunction(true)}>
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/faq" onClick={() => openNavFunction(true)}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/" onClick={() => openNavFunction(false)}>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </Link>

          <div className={`sign-in-buttons ${sideNavOpen ? 'show-buton' : ''}`}>
            {token !== null ? (
              <>
                <Link to="/profile" onClick={() => openNavFunction(true)}>
                  <button className="custom-button profile-btn">Profile</button>
                </Link>
                <Link to="/activity" onClick={() => openNavFunction(true)}>
                  <button className="custom-button">Activity</button>
                </Link>

                <Link to="/" onClick={() => openNavFunction(true)}>
                  <button className="custom-button" onClick={() => logout()}>
                    Log Out
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="custom-button">Login</button>
                </Link>
                <Link to="/signUp">
                  <button className="button">Register</button>
                </Link>
              </>
            )}
          </div>
          <div className="side-nav-btn" onClick={() => openNavFunction(true)}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
