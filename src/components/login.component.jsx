import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';
import { TokenContext } from '../context/token.context';

import { url } from '../url';

const Login = ({ token }) => {
  const { changeToken } = useContext(TokenContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongData, setWrongData] = useState(null);

  useEffect(() => {
    if (token) {
      history.push('/');
      console.log(token);
    }
  }, [token, history]);

  const validate = (email, password) => {
    fetch(url + '/login/', {
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
        if (!data.error) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          setWrongData(false);
          changeToken(data.token);
          window.location.replace('/');
        } else {
          setWrongData(true);
          return 0;
        }
      })
      .catch((err) => setWrongData(true));
  };

  return (
    <CustomFormLayout title="Login" full>
      <CustomInput
        type="email"
        label="Email*"
        handleChange={(e) => setEmail(e.target.value)}
        required
      />

      <CustomInput
        type="password"
        label="Password*"
        handleChange={(e) => setPassword(e.target.value)}
        required
      />

      {wrongData === null ? (
        <div></div>
      ) : wrongData === true ? (
        <p style={{ color: 'red', marginBottom: 6 }}>
          {' '}
          Email or Password is Incorrect.
        </p>
      ) : (
        <div></div>
      )}

      <div className="group">
        <button
          type="button"
          className="button"
          onClick={() => validate(email, password)}
        >
          Login
        </button>

        <p className="option">or login with</p>

        <Link to="/" style={{ display: 'inline-block' }}>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
          </div>
        </Link>
      </div>

      <div className="forgot-password">
        <Link to="/resetPassword">Forget Password</Link>
      </div>

      <div className="already-account">
        Need An Account with us ? <Link to="/signUp">Sign Up Now</Link>
      </div>
    </CustomFormLayout>
  );
};

export default Login;
