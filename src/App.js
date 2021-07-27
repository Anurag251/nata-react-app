import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './assets/styles/styles.scss';
import './assets/styles/responsive.scss';

import TokenContextProvider from './context/token.context';
import { TokenContext } from './context/token.context';

import Footer from './components/footer.component';
import Header from './components/header.component';
import AboutPage from './pages/about/aboutpage.component';
import Homepage from './pages/homepage/homepage.component';
import FaqPage from './pages/FAQ/FAQpage.component';
import LoginPage from './pages/login-and-signup/loginpage.component';
import SignUpPage from './pages/login-and-signup/sign-up-page.component';
import ProfilePage from './pages/profile/profile-page.component';
import ActivityPage from './pages/activity/activity-page.component';
import EmailVerification from './pages/verifications/email-verifications.component';
import CodeVerificationPage from './pages/verifications/code-verifications.component.jsx';
import NewReceiverPage from './pages/receiver/new-receiver-page.component';
import EditReceiverPage from './pages/receiver/edit-receiver-page.component';
import MoneyTransferPage from './pages/money-transfer/money-transfer.component';
import AddBankDetailsPage from './pages/add-bank-details/add-bank-details-page.component';
import TransactionHistoryPage from './pages/transition-history/transition-history-page.component';

const App = () => {
  const { token, changeToken } = useContext(TokenContext);

  useEffect(() => {
    changeToken(localStorage.getItem('token'));
  }, [changeToken]);

  return (
    <div className="App">
      <TokenContextProvider>
        <Header />
      </TokenContextProvider>

      <div className="route">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/about">
            <AboutPage />
          </Route>

          <Route exact path="/faq">
            <FaqPage />
          </Route>

          <Route exact path="/login">
            <TokenContextProvider>
              <LoginPage token={token} />
            </TokenContextProvider>
          </Route>

          <Route exact path="/signUp">
            <SignUpPage />
          </Route>

          <Route exact path="/resetPassword">
            <EmailVerification />
          </Route>

          <Route exact path="/codeVerifivation">
            <CodeVerificationPage />
          </Route>

          <Route exact path="/newReceiver">
            <NewReceiverPage />
          </Route>

          <Route exact path="/editReceiver">
            <EditReceiverPage />
          </Route>

          <Route exact path="/remit">
            <MoneyTransferPage />
          </Route>

          <Route exact path="/addBankDetails">
            <AddBankDetailsPage />
          </Route>

          <Route exact path="/transactionHistory">
            <TransactionHistoryPage />
          </Route>

          <Route exact path="/profile" component={ProfilePage} />

          <Route exact path="/activity" component={ActivityPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
