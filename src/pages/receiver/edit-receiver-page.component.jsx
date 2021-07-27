import React, { useEffect } from 'react';
import EditReceiver from '../../components/edit-receiver.component';
import PageBanner from '../../components/page-banner.component';

const EditReceiverPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="new-receiver-page">
      <PageBanner title="Edit Receiver" />
      <EditReceiver />
    </div>
  );
};

export default EditReceiverPage;
