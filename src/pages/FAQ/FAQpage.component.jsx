import React, { useEffect } from 'react';
import FAQ from '../../components/faq.component';
import PageBanner from '../../components/page-banner.component';
import { FAQ_DATA } from '../../data/faq.data';

const FaqPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="faq-page">
      <PageBanner title="FAQ" />
      <FAQ faqs={FAQ_DATA} />
    </div>
  );
};

export default FaqPage;
