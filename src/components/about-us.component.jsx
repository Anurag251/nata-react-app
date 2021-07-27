import React from 'react';
import aboutImg from '../assets/images/about.jpeg';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div
          className="image"
          style={{ backgroundImage: `url(${aboutImg})` }}
        ></div>
        <div className="content">
          <div className="title">Here is our story</div>
          <p>
            NATA mobile is a multi carrier network service and now we are
            starting to provide Money transfer service to Nepal in a best rate
            in UK. Our rates are highly competitive. We ensure that your funds
            are safe and secure for each and every transfer you make.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
