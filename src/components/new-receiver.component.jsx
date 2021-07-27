import React, { useState } from 'react';
import { url } from '../url';
import CustomFileDrag from './custom-file-drag.component';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';
import MessagePopup from './message-popup.component';

const NewReceiver = () => {
  const [added, setAdded] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postCode, setPostCode] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [citizenshipNumeber, setCitizenshipNumber] = useState('');
  const [citizenshipScan, setCitizenshipScan] = useState('');
  const [receiverAddedBy, setReceiverAddedBy] = useState(
    localStorage.getItem('id')
  );

  const [firstNameCheckLength, setFirstNameCheckLength] = useState('');
  const [lastNameCheckLength, setLastNameCheckLength] = useState('');
  const [postCodeCheckLength, setPostCodeCheckLength] = useState('');
  const [contactCheckLength, setContactCheckLength] = useState('');
  const [addressCheckLength, setAddressCheckLength] = useState('');
  const [cityCheckLength, setCityCheckLength] = useState('');
  const [citizenshipNumeberCheckLength, setCitizenshipNumberCheckLength] =
    useState('');

  const getCitizenship = (citizenshipScan) => {
    setCitizenshipScan(citizenshipScan);
  };

  const onSubmit = (
    firstName,
    lastName,
    postCode,
    contact,
    address,
    city,
    citizenshipNumeber,
    citizenshipScan,
    receiverAddedBy
  ) => {
    setReceiverAddedBy(localStorage.getItem('id'));

    if (firstName.length > 20 || firstName.length <= 0) {
      setFirstNameCheckLength(true);
      return 0;
    } else {
      setFirstNameCheckLength('');
    }
    if (lastName.length > 20 || lastName.length <= 0) {
      setLastNameCheckLength(true);
      return 0;
    } else {
      setLastNameCheckLength('');
    }

    if (postCode.length > 20 || postCode.length <= 0) {
      setPostCodeCheckLength(true);
      return 0;
    } else {
      setPostCodeCheckLength('');
    }

    if (contact.length > 20 || contact.length <= 0) {
      setContactCheckLength(true);
      return 0;
    } else {
      setContactCheckLength('');
    }

    if (address.length > 20 || address.length <= 0) {
      setAddressCheckLength(true);
      return 0;
    } else {
      setAddressCheckLength('');
    }
    if (city.length > 20 || city.length <= 0) {
      setCityCheckLength(true);
      return 0;
    } else {
      setCityCheckLength('');
    }
    if (citizenshipNumeber.length > 20 || citizenshipNumeber.length <= 0) {
      setCitizenshipNumberCheckLength(true);
      return 0;
    } else {
      setCitizenshipNumberCheckLength('');
    }
    if (receiverAddedBy.length > 20 || receiverAddedBy.length <= 0) {
      return 0;
    }

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('postcode', postCode);
    formData.append('contact_no', contact);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('citizenship_number', citizenshipNumeber);

    if (citizenshipScan !== '') {
      formData.append('citizenship_scan', citizenshipScan);
    }
    formData.append('receiver_added_by', receiverAddedBy);

    setAdded('loading');

    fetch(url + '/addReceiver/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setAdded(true);

        setTimeout(() => {
          setAdded(null);
        }, 5000);
      })
      .catch((err) => {
        setAdded(false);

        setTimeout(() => {
          setAdded(null);
        }, 5000);
      });
  };
  return (
    <div>
      <MessagePopup added={added} />
      <CustomFormLayout title="Add New Receiver" full>
        <CustomInput
          type="text"
          label="First Name"
          handleChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          border={firstNameCheckLength}
        />
        <CustomInput
          type="text"
          label="Last Name"
          handleChange={(e) => setLastName(e.target.value)}
          value={lastName}
          border={lastNameCheckLength}
        />
        <CustomInput
          type="number"
          label="Postcode"
          handleChange={(e) => setPostCode(e.target.value)}
          value={postCode}
          border={postCodeCheckLength}
        />
        <CustomInput
          type="number"
          label="Contact Number"
          handleChange={(e) => setContact(e.target.value)}
          value={contact}
          border={contactCheckLength}
        />
        <CustomInput
          type="text"
          label="Addresss"
          handleChange={(e) => setAddress(e.target.value)}
          value={address}
          border={addressCheckLength}
        />
        <CustomInput
          type="text"
          label="City"
          handleChange={(e) => setCity(e.target.value)}
          value={city}
          border={cityCheckLength}
        />
        <CustomInput
          type="number"
          label="Citizenship Number"
          handleChange={(e) => setCitizenshipNumber(e.target.value)}
          value={citizenshipNumeber}
          border={citizenshipNumeberCheckLength}
        />

        <div className="file-to-drag">
          <div className="title">Receiver Citizenship Snap</div>
          <CustomFileDrag
            handleChange={(e) => setCitizenshipScan(e.target.value)}
            getData={getCitizenship}
            data={citizenshipScan}
          />
        </div>

        {/* <CustomInput
          type="Number"
          label="Receiver Added By"
          handleChange={(e) => setReceiverAddedBy(e.target.value)}
          value={receiverAddedBy}
          border={receiverAddedByCheckLength}
        /> */}
        <button
          className="button"
          onClick={() => {
            onSubmit(
              firstName,
              lastName,
              postCode,
              contact,
              address,
              city,
              citizenshipNumeber,
              citizenshipScan,
              receiverAddedBy
            );
          }}
        >
          Save Now
        </button>
      </CustomFormLayout>
    </div>
  );
};

export default NewReceiver;
