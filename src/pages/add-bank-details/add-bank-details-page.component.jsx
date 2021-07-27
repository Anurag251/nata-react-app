import React, { useEffect } from 'react';
import AddBankDetails from '../../components/add-bank-details.component';
import PageBanner from '../../components/page-banner.component';

const AddBankDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageBanner title="Add Bank Details" />
      <AddBankDetails />
    </div>
  );
};

export default AddBankDetailsPage;
