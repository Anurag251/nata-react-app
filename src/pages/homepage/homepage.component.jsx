import React, { useState, useEffect } from 'react';
import Banner from '../../components/banner.component';
import MobileApp from '../../components/mobile-app.componsnt';
import SendingProcess from '../../components/sending-process.component';
import WhyChooseUs from '../../components/why-choose-us.component';

import WHY_CHOOSE_US from '../../data/why-choose-us.data';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [whyChooseUs] = useState(WHY_CHOOSE_US);
  return (
    <div className="home">
      <Banner />
      <SendingProcess />
      <WhyChooseUs whyChooseUs={whyChooseUs} />
      <MobileApp />
    </div>
  );
};

export default Homepage;
