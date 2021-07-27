import React, { useEffect } from 'react';
import PageBanner from '../../components/page-banner.component';
import TransactionHistory from '../../components/transition-history.component';

const TransactionHistoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageBanner title="Transition History" />
      <TransactionHistory />
    </div>
  );
};

export default TransactionHistoryPage;
