import React, { useEffect } from 'react';

import AboutUs from '../../components/about-us.component';
import Customer from '../../components/customer.component';
import PageBanner from '../../components/page-banner.component';
import WhyChooseUs from '../../components/why-choose-us.component';

import WHY_CHOOSE_US from '../../data/why-choose-us.data';
import { CUSTOMER } from '../../data/customer.data';
import MobileApp from '../../components/mobile-app.componsnt';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-page">
      <PageBanner title="About Us" />
      <AboutUs />
      <WhyChooseUs whyChooseUs={WHY_CHOOSE_US} />
      <Customer customers={CUSTOMER} />
      <MobileApp />
    </div>
  );
};

export default AboutPage;
