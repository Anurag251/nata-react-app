import React, { useEffect, useState } from 'react';
import { url } from '../url';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';
import MessagePopup from './message-popup.component';

const AddBankDetails = () => {
  const [bankName, setBankName] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankBranch, setBankBranch] = useState('');

  const [person, setPerson] = useState('');
  const [receiverNotSelected, setReceiverNotSelected] = useState('');

  const [bankNameCheckLength, setBankNameCheckLength] = useState('');
  const [bankNumberCheckLength, setBankNumberCheckLength] = useState('');
  const [accountNameCheckLength, setAccountNameCheckLength] = useState('');
  const [bankBranchCheckLength, setBankBranchCheckLength] = useState('');

  const [added, setAdded] = useState('');
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    fetch(url + `/receiverList/${localStorage.getItem('id')}/`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Token ' + localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReceiver(data);
      })
      .catch((err) => {});
  }, []);

  const onSubmit = (bankName, bankNumber, accountName, bankBranch, person) => {
    if (typeof person !== 'number') {
      setReceiverNotSelected(true);
      return 0;
    } else {
      setReceiverNotSelected(false);
    }

    if (bankName.length > 20 || bankName.length <= 0) {
      setBankNameCheckLength(true);
      return 0;
    } else {
      setBankNameCheckLength('');
    }

    if (bankNumber.length > 20 || bankNumber.length <= 0) {
      setBankNumberCheckLength(true);
      return 0;
    } else {
      setBankNumberCheckLength('');
    }

    if (accountName.length > 20 || accountName.length <= 0) {
      setAccountNameCheckLength(true);
      return 0;
    } else {
      setAccountNameCheckLength('');
    }

    if (bankBranch.length > 20 || bankBranch.length <= 0) {
      setBankBranchCheckLength(true);
      return 0;
    } else {
      setBankBranchCheckLength('');
    }

    setAdded('loading');

    const formData = new FormData();
    formData.append('receiver', person);
    formData.append('bank_name', bankName);
    formData.append('bank_branch', bankBranch);
    formData.append('account_name', accountName);
    formData.append('account_no', bankNumber);

    fetch(url + '/addBankDetails/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.bank_name[0] === 'Bank Name Already Exist') {
          setAdded('exist');

          setTimeout(() => {
            setAdded(null);
          }, 5000);
          return 0;
        }
        setAdded('addedBankInfo');

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

  const select = (id) => {
    if (id === '') {
      setPerson('');
      return 0;
    }

    receiver.forEach((receiver) => {
      if (receiver.id === Number(id)) {
        setPerson(receiver.id);
      }
    });
  };

  if (receiver === '') {
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
  } else {
    return (
      <CustomFormLayout full title="Add Bank Informations">
        <MessagePopup added={added} />

        <div className="input-group">
          <label>Select Receiver</label>
          <select
            className="select-btn"
            name="select"
            onChange={(e) => select(e.target.value)}
          >
            <option value="">Select</option>
            {typeof receiver !== 'string' ? (
              receiver.map((receiver) => (
                <option key={receiver.id} value={receiver.id}>
                  {receiver.first_name} {receiver.last_name}
                </option>
              ))
            ) : (
              <option value="">No data found</option>
            )}
          </select>
        </div>

        <CustomInput
          label="Bank Name"
          value={bankName}
          type="text"
          handleChange={(e) => setBankName(e.target.value)}
          border={bankNameCheckLength}
        />

        <CustomInput
          label="Bank Number"
          value={bankNumber}
          type="number"
          handleChange={(e) => setBankNumber(e.target.value)}
          border={bankNumberCheckLength}
        />

        <CustomInput
          label="Account Name"
          value={accountName}
          type="text"
          handleChange={(e) => setAccountName(e.target.value)}
          border={accountNameCheckLength}
        />

        <CustomInput
          label="Bank Branch"
          value={bankBranch}
          type="text"
          handleChange={(e) => setBankBranch(e.target.value)}
          border={bankBranchCheckLength}
        />

        {receiverNotSelected === true ? (
          <p style={{ color: 'red', marginBottom: 15 }}>
            Receiver Must Be Selected.
          </p>
        ) : null}

        <button
          className="button"
          onClick={() =>
            onSubmit(bankName, bankNumber, accountName, bankBranch, person)
          }
        >
          Submit
        </button>
      </CustomFormLayout>
    );
  }
};

export default AddBankDetails;
