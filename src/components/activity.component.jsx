import React, { useEffect, useState } from 'react';
import { url } from '../url';
import CustomFileDrag from './custom-file-drag.component';

import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';

const Activity = () => {
  const [profile, setProfile] = useState('');

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [occ, setOcc] = useState('');
  const [country, setCountry] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [liscense, setLiscense] = useState('');
  const [passport, setPassport] = useState('');

  const [done, setDone] = useState('');

  const getCitizenship = (citizenship) => {
    setCitizenship(citizenship);
  };

  const getLiscense = (liscense) => {
    setLiscense(liscense);
  };

  const getPassport = (passport) => {
    setPassport(passport);
  };

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
        data.mobile_number ? setNumber(data.mobile_number) : setNumber('');
        data.country ? setCountry(data.country) : setCountry('');
        data.citizenship !== null
          ? setCitizenship(data.citizenship)
          : setCitizenship('');
        data.occupation !== null ? setOcc(data.occupation) : setOcc('');
        data.license !== null ? setLiscense(data.license) : setLiscense('');
        data.passport !== null ? setPassport(data.passport) : setPassport('');
      });
  }, []);

  const update = (
    name,
    number,
    occ,
    country,
    citizenship,
    liscense,
    passport
  ) => {
    if (
      name === '' ||
      number === '' ||
      occ === '' ||
      country === '' ||
      citizenship === '' ||
      liscense === '' ||
      passport === ''
    ) {
      setDone(false);
      return 0;
    }

    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('occupation', occ);
    formData.append('country', country);
    formData.append('mobile_number', number);
    if (typeof citizenship !== 'string') {
      formData.append('citizenship', citizenship, citizenship.name);
    }
    if (typeof liscense !== 'string') {
      formData.append('license', liscense, liscense.name);
    }
    if (typeof passport !== 'string') {
      formData.append('passport', passport, passport.name);
    }

    fetch(url + `/profile/${localStorage.getItem('id')}/`, {
      method: 'PATCH',
      headers: new Headers({
        Authorization: 'Token ' + localStorage.getItem('token'),
      }),
      body: formData,
    }).then((res) => res.json());
    // .then((data) => console.log(data))
    // .catch((err) => console.log(1));
  };

  if (profile !== '') {
    return (
      <CustomFormLayout
        profile
        activity
        title="Active Transactions"
        data={profile}
      >
        <CustomInput
          type="text"
          label="Full Name*"
          value={name}
          handleChange={(e) => setName(e.target.value)}
          required
        />

        <CustomInput
          type="number"
          label="Phone Number*"
          value={number}
          handleChange={(e) => setNumber(e.target.value)}
          required
        />

        <CustomInput
          type="text"
          label="Occupation*"
          value={occ}
          handleChange={(e) => setOcc(e.target.value)}
          required
        />

        <CustomInput
          type="text"
          label="Country*"
          value={country}
          handleChange={(e) => setCountry(e.target.value)}
          required
        />

        <div className="drop-group">
          <div className="file-to-drag">
            <div className="title">Citizenship</div>

            <CustomFileDrag getData={getCitizenship} data={citizenship} />
          </div>

          <div className="file-to-drag">
            <div className="title">Liscense</div>

            <CustomFileDrag getData={getLiscense} data={liscense} />
          </div>

          <div className="file-to-drag">
            <div className="title">Passport</div>

            <CustomFileDrag getData={getPassport} data={passport} />
          </div>
        </div>

        {done === false ? (
          <p style={{ color: 'red', marginBottom: 10 }}>
            All fields are required*
          </p>
        ) : done === true ? (
          <p style={{ color: 'green', marginBottom: 10 }}>Updated!</p>
        ) : null}

        <button
          className="button"
          onClick={() =>
            update(name, number, occ, country, citizenship, liscense, passport)
          }
        >
          Update
        </button>
      </CustomFormLayout>
    );
  } else {
    return (
      <h2
        style={{
          textAlign: 'center',
          height: 500,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        LOADING...
      </h2>
    );
  }
};

export default Activity;
