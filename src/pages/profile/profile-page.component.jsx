import React, { useEffect } from 'react';

import PageBanner from '../../components/page-banner.component';
import Profile from '../../components/profile.component';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="profile-page">
      <PageBanner title="Profile" />
      <Profile />
    </div>
  );
};

export default ProfilePage;
