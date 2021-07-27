import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';

import { url } from '../url';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [wrongData, setWrongData] = useState(null);
  const [psw, setPsw] = useState('');
  const [psw2, setPsw2] = useState('');
  const [isMatched, setIsMatched] = useState('empty');
  const [done, setDone] = useState(false);

  const history = useHistory();

  const validate = (email, password) => {
    if (!done) {
      return 0;
    }
    fetch(url + '/signup/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email[0] !== 'user with this email address already exists.') {
          // localStorage.setItem('token', data.token);
          setWrongData(false);
          history.push({
            pathname: '/login',
          });
        } else {
          setWrongData(true);
          return 0;
        }
      })
      .catch((err) => setWrongData(true));
  };

  useEffect(() => {
    if (psw === '' || psw === '') {
      setIsMatched('empty');
      setDone(false);
    }
    if (isMatched === 'exist') {
      return 0;
    }
    if (psw.length < 8 || psw2.length < 8) {
      setIsMatched('short');
      setDone(false);
    } else if (psw === psw2 && psw.length >= 8 && psw2.length >= 8) {
      setIsMatched('done');
      setDone(true);
    } else {
      setIsMatched('mistake');
      setDone(false);
    }
  }, [psw, psw2, isMatched]);

  return (
    <CustomFormLayout title="Register" full>
      {wrongData ? (
        <p style={{ color: 'red', marginBottom: 10 }}>Account Already Exist.</p>
      ) : null}
      <CustomInput
        type="email"
        label="Email*"
        handleChange={(e) => setEmail(e.target.value)}
        required
      />

      <CustomInput
        type="password"
        label="Password*"
        handleChange={(e) => setPsw(e.target.value)}
        required
      />

      <CustomInput
        type="password"
        label="Confirm Password*"
        handleChange={(e) => setPsw2(e.target.value)}
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

      <button className="button" onClick={() => validate(email, psw)}>
        Sign Up
      </button>

      <div className="already-account">
        Already Have An Account?<Link to="/login">Login</Link>
      </div>
    </CustomFormLayout>
  );
};

export default SignUp;
