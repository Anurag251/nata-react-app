import React, { useEffect } from 'react';
import PageBanner from '../../components/page-banner.component';
import Transfer from '../../components/transfer.component';

const MoneyTransferPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="money-transfer">
      <PageBanner title="Remit" />
      <Transfer />
    </div>
  );
};

export default MoneyTransferPage;
