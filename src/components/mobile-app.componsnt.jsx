import React from 'react';

import mobImage from '../assets/images/mobile.png';
import appleIcon from '../assets/images/icons/apple.svg';
import playIcon from '../assets/images/icons/play_store.svg';

const MobileApp = () => {
  return (
    <div className="mobile-app">
      <div className="container">
        <div className="image">
          <img src={mobImage} alt="" />
        </div>
        <div className="content">
          <h1 className="title">
            Download our apps of your <br />
            mobile phone for service
          </h1>
          <p>
            Replacing a maintains the amount of lines. When replacing a
            selection. help agencies to define their new business objectives and
            then createReplacing a maintains the amount of lines. When replacing
            a selection. help agencies to define their new business objectives
            and then createReplacing a maintains the amount of lines. When
            replacing a selection. help agencies to define their new business
            objectives and then create
          </p>
          <div className="buttons-group">
            <button className="button">
              <img src={appleIcon} alt="" />
              <div>
                <h6>Download on</h6>
                <h4>App Store</h4>
              </div>
            </button>

            <button className="custom-button">
              <img src={playIcon} alt="" />
              <div>
                <h6>Download on</h6>
                <h4 className="try">Play Store</h4>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
