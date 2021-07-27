import React, { useEffect, useState } from 'react';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';
import Popup from './popup.component';
import MessagePopup from './message-popup.component';

import { url } from '../url';

const Profile = () => {
  const [profile, setProfile] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [changePasswordStatus, setChangePasswordStatus] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isMatched, setIsMatched] = useState('empty');
  const [done, setDone] = useState(false);
  const [added, setAdded] = useState('');

  const updateProfile = () => {};

  useEffect(() => {
    fetch(url + `/profile/${localStorage.getItem('id')}/`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Token ' + localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        data.full_name ? setName(data.full_name) : setName('');
        data.email ? setEmail(data.email) : setEmail('');
      });
  }, []);

  useEffect(() => {
    if (newPassword === '' || newPassword === '') {
      setIsMatched('empty');
      setDone(false);
    }
    if (isMatched === 'exist') {
      return 0;
    }
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setIsMatched('short');
      setDone(false);
    } else if (
      newPassword === confirmPassword &&
      newPassword.length >= 8 &&
      confirmPassword.length >= 8
    ) {
      setIsMatched('done');
      setDone(true);
    } else {
      setIsMatched('mistake');
      setDone(false);
    }
  }, [newPassword, confirmPassword, isMatched]);

  useEffect(() => {
    if (!changePasswordStatus) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [changePasswordStatus]);

  const onPasswordChange = (oldPassword, newPassword, done) => {
    if (!done) return 0;
    if (oldPassword === '' || newPassword === '') return 0;

    setAdded('loading');

    const formData = new FormData();
    formData.append('old_password', oldPassword);
    formData.append('new_password', newPassword);

    fetch(url + '/change_password/', {
      method: 'PUT',
      headers: new Headers({
        Authorization: 'Token ' + localStorage.getItem('token'),
      }),
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setAdded('updatedPassword');
          setChangePasswordStatus(false);

          setTimeout(() => {
            setAdded(null);
          }, 5000);
        } else {
          setAdded(false);
          setTimeout(() => {
            setAdded(null);
          }, 5000);
        }
      })
      .catch((err) => {
        if (err) {
          setAdded(false);
          setTimeout(() => {
            setAdded(null);
          }, 5000);
          return 0;
        }
      });
  };

  return (
    <>
      <MessagePopup added={added} />
      {profile !== '' ? (
        <CustomFormLayout
          profile
          title="Profile"
          data={profile}
          changePasswordUI
          setChangePasswordStatus={setChangePasswordStatus}
        >
          <Popup
            display={changePasswordStatus}
            setDisplay={setChangePasswordStatus}
            setViewedTransactionId={null}
          >
            <div className="title">Change Password</div>
            <CustomInput
              type="password"
              label="Old Password*"
              handleChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
              required
            />

            <CustomInput
              type="password"
              label="New Password*"
              handleChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />

            <CustomInput
              type="password"
              label="Confirm Password*"
              value={confirmPassword}
              handleChange={(e) => setConfirmPassword(e.target.value)}
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
              <p style={{ color: 'green', marginBottom: 6 }}>
                Password Matched!
              </p>
            )}
            <button
              className="button"
              onClick={() => onPasswordChange(oldPassword, newPassword, done)}
            >
              Change Password
            </button>
          </Popup>
          <form>
            <CustomInput
              type="text"
              label="Name*"
              value={name}
              handleChange={(e) => setName(e.target.value)}
              required
            />

            <CustomInput
              type="email"
              label="Email*"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="button" onClick={() => updateProfile()}>
              Update
            </button>
          </form>
        </CustomFormLayout>
      ) : (
        <h2 className="loading">LOADING...</h2>
      )}
    </>
  );
};

export default Profile;
