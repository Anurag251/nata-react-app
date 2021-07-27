import React, { useEffect } from 'react';
import NewReceiver from '../../components/new-receiver.component';
import PageBanner from '../../components/page-banner.component';

const NewReceiverPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="new-receiver-page">
      <PageBanner title="Add New Receiver" />
      <NewReceiver />
    </div>
  );
};

export default NewReceiverPage;
