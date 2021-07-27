import React, { useEffect } from 'react';
import Login from '../../components/login.component';
import PageBanner from '../../components/page-banner.component';

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="login-page">
      <PageBanner title="Login" />
      <Login />
    </div>
  );
};

export default LoginPage;
