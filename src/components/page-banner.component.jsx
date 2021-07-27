import React from 'react';
import bannerImg from '../assets/images/banner.jpg';

const PageBanner = ({ title }) => {
  return (
    <div
      className="page-banner"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="banner-title">{title}</div>
    </div>
  );
};

export default PageBanner;
