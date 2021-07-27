import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';

import { url } from '../url';

const PasswordResetEmailVerification = () => {
  // state
  const [email, setEmail] = useState('');
  const [registerdEmail, setRegisterdEmail] = useState(null);
  const [code, setCode] = useState('');
  const [verifiedCode, setVerifiedCode] = useState(null);
  const [isMatched, setIsMatched] = useState('empty');
  const [done, setDone] = useState(false);
  const [newPsw, setNewPsw] = useState('');
  const [newPsw1, setNewPsw1] = useState('');

  const history = useHistory();

  //reset code
  const resetCode = (email, code) => {
    fetch(url + '/code_verification/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVerifiedCode(true);
          setRegisterdEmail('');
        } else {
          setVerifiedCode(false);
        }
      })
      .catch((err) => setVerifiedCode(false));
  };

  //reset password
  const resetPassword = (email) => {
    fetch(url + '/email_verification/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRegisterdEmail(true);
        } else {
          setRegisterdEmail(false);
        }
      })
      .catch(() => {
        setRegisterdEmail(false);
        return 0;
      });
  };

  //check password length and correct password
  useEffect(() => {
    if (newPsw === '' || newPsw === '') {
      setIsMatched('empty');
      setDone(false);
    }
    if (isMatched === 'exist') {
      return 0;
    }
    if (newPsw.length < 8 || newPsw1.length < 8) {
      setIsMatched('short');
      setDone(false);
    } else if (
      newPsw === newPsw1 &&
      newPsw.length >= 8 &&
      newPsw1.length >= 8
    ) {
      setIsMatched('done');
      setDone(true);
    } else {
      setIsMatched('mistake');
      setDone(false);
    }
  }, [newPsw, newPsw1, isMatched]);

  //set new password
  const submitPsw = (email, password, done) => {
    if (!done) return 0;

    fetch(url + '/reset_password/', {
      method: 'OPTIONS',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push('/login');
      })
      .catch((err) => {});
  };

  return (
    <>
      {registerdEmail === null ? (
        <CustomFormLayout title="Email Verification" full>
          <CustomInput
            type="email"
            label="Email*"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          {registerdEmail === false ? (
            <p style={{ color: 'red' }}>Account doesn't exist</p>
          ) : registerdEmail === true ? (
            <p style={{ color: 'green' }}>Check your email</p>
          ) : null}
          <button className="button" onClick={() => resetPassword(email)}>
            Submit
          </button>
        </CustomFormLayout>
      ) : registerdEmail ? (
        <CustomFormLayout title="Check Your Email" full>
          <CustomInput
            type="number"
            label="Your code*"
            handleChange={(e) => setCode(e.target.value)}
            value={code}
            required
          />

          {verifiedCode || verifiedCode === '' ? null : (
            <p style={{ color: 'red' }}>Invalid Code.</p>
          )}

          <button className="button" onClick={() => resetCode(email, code)}>
            Submit
          </button>
        </CustomFormLayout>
      ) : verifiedCode === true ? (
        <CustomFormLayout title="Change Your Password" full>
          <CustomInput
            type="password"
            label="New Password*"
            handleChange={(e) => setNewPsw(e.target.value)}
            value={newPsw}
            required
          />

          <CustomInput
            type="password"
            label="Confirm Password*"
            handleChange={(e) => setNewPsw1(e.target.value)}
            value={newPsw1}
            required
          />

          {isMatched === 'empty' ? (
            <p
              style={{
                color: 'black',
                marginBottom: 6,
              }}
            >
              *Password must be atleast 8 characters!
            </p>
          ) : isMatched === 'mistake' ? (
            <p
              style={{
                color: 'red',
                marginBottom: 6,
              }}
            >
              Password didn't Match!
            </p>
          ) : isMatched === 'short' ? (
            <p
              style={{
                color: 'black',
                marginBottom: 6,
              }}
            >
              *Password must be atleast 8 characters!
            </p>
          ) : isMatched === 'exist' ? (
            <p
              style={{
                color: 'red',
                marginBottom: 6,
              }}
            >
              Account from this phone number already exists.
            </p>
          ) : (
            <p style={{ color: 'green', marginBottom: 6 }}>Password Matched!</p>
          )}

          <button
            className="button"
            onClick={() => submitPsw(email, newPsw, done)}
          >
            Submit
          </button>
        </CustomFormLayout>
      ) : null}
    </>
  );
};

export default PasswordResetEmailVerification;
