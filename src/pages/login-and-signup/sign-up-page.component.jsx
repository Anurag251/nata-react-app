import React, { useEffect } from 'react';
import PageBanner from '../../components/page-banner.component';
import SignUp from '../../components/sign-up.component';

const SignUpPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="sign-up-page">
      <PageBanner title="Register" />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
