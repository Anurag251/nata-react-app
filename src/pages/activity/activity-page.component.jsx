import React, { useEffect } from 'react';
import Activity from '../../components/activity.component';
import PageBanner from '../../components/page-banner.component';

const ActivityPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <PageBanner title="Activity" />
      <Activity />
    </div>
  );
};

export default ActivityPage;
