import React, { useEffect } from 'react';
import PageBanner from '../../components/page-banner.component';
import PasswordResetEmailVerification from '../../components/password-reset-email-verification.component';

const EmailVerification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="email-verification">
      <PageBanner title="Email Verification" />
      <PasswordResetEmailVerification />
    </div>
  );
};

export default EmailVerification;
