import React, { useEffect } from 'react';
import PageBanner from '../../components/page-banner.component';
import PasseordResetCodeVerification from '../../components/password-reset-code-verification.component';

const CodeVerificationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="code-verification">
      <PageBanner title="Code Verification" />
      <PasseordResetCodeVerification />
    </div>
  );
};

export default CodeVerificationPage;
