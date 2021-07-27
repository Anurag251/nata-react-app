import React from 'react';
import backgroungImage from '../assets/images/background.jpg';

const WhyChooseUs = ({ whyChooseUs }) => {
  return (
    <div
      className="why-choose-us"
      style={{ backgroundImage: `url(${backgroungImage})` }}
    >
      <div className="container">
        <h1 className="title">
          Why Choose NATA money <br />
          transfer
        </h1>

        <div className="list">
          {whyChooseUs.map((item) => (
            <div className="item" key={item.id}>
              <div className="icon-fix">
                <img src={item.icon} alt="icon" />
              </div>
              <div className="icon">
                <img src={item.icon} alt="icon" />
              </div>
              <div className="content">
                <div className="sub-title">{item.name}</div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
