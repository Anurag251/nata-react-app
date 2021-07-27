import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../url';
import CustomFormLayout from './custom-form-layout.component';
import CustomInput from './custom-input.component';
import MessagePopup from './message-popup.component';
import Popup from './popup.component';

const Transfer = () => {
  const [receiver, setReceiver] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [sender, setSender] = useState(localStorage.getItem('id'));
  const [selectedReceiver, setSelectedReceiver] = useState('');
  const [bank, setBank] = useState('');
  const [amt, setAmt] = useState('');

  const [error, setError] = useState('');
  const [amtCheck, setAmtCheck] = useState('');

  const [person, setPerson] = useState('');
  const [amountSend, setAmountSend] = useState('');

  const [convert, setConvert] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);

  const [added, setAdded] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);
  const [displayDetailsLoading, setDisplayDetailsLoading] = useState('');
  const [amtLimit, setAmtLimit] = useState('');

  useEffect(() => {
    fetch(url + '/exchangeRate/')
      .then((res) => res.json())
      .then((data) => setExchangeRate(data[0]));
  }, []);

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

  useEffect(() => {
    if (person === '') return 0;

    receiver.forEach((receiver) => {
      if (receiver.id === person) {
        if (receiver.bank_details !== []) {
          setBankDetails(receiver.bank_details);
        } else {
          setBankDetails('');
        }
      }
    });
  }, [person, receiver]);

  const onSubmit = (selectedReceiver, sender, bank, amt) => {
    setSender(localStorage.getItem('id'));

    if (selectedReceiver === '' || bank === '' || sender === '') {
      setError(true);
      return 0;
    } else setError('');

    if (amt === '') {
      setAmtCheck(true);
      return 0;
    } else {
      setAmtCheck(false);
    }

    if (amt > 100 || amt < 1) {
      setAmtLimit(true);
      return 0;
    }

    setAdded('loading');
    setDisplayDetails(true);
    setDisplayDetailsLoading(true);

    const formData = new FormData();
    formData.append('sender', sender);
    formData.append('receiver', selectedReceiver);
    formData.append('bank', bank);
    formData.append('amount', amt);
    fetch(url + '/transfer/', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Token ' + localStorage.getItem('token'),
      }),

      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          setAmountSend('no data');
          return 0;
        } else {
          setAmountSend(data);

          setAdded('transfer');
          setDisplayDetails(true);
          setDisplayDetailsLoading(false);

          setTimeout(() => {
            setAdded(null);
          }, 5000);
        }
      })
      .catch((err) => {
        setAdded(false);

        setTimeout(() => {
          setAdded(null);
        }, 5000);
      });
  };

  const select = (id) => {
    if (id === '') return 0;

    receiver.forEach((receiver) => {
      if (receiver.id === Number(id)) {
        setPerson(receiver.id);
        setSelectedReceiver(receiver.id);
      }
    });
  };

  if (receiver === '' || exchangeRate === null)
    return <h2 className="loading">LOADING...</h2>;
  else {
    return (
      <>
        <MessagePopup added={added} />
        <CustomFormLayout title={`Exchange Rate ${exchangeRate.selling}`} full>
          <Popup
            display={displayDetails}
            setDisplay={setDisplayDetails}
            setViewedTransactionId={null}
          >
            {displayDetailsLoading ? (
              <h2>LOADING...</h2>
            ) : amountSend !== '' ? (
              <div className="inner-material">
                <h1>Transaction Details: </h1>
                <h4>Amount Trensferred: {Number(convert).toFixed(2)}</h4>
                <ul>
                  <li>
                    <strong> Transferred To: </strong>
                    {amountSend.receiver.first_name}{' '}
                    {amountSend.receiver.last_name}
                  </li>
                  <li>
                    <strong>Account Number:</strong>{' '}
                    {amountSend.receiver.bank.account_no}
                  </li>
                </ul>
                <h4>Transaction will be processed once funds received.</h4>

                <Link to="/transactionHistory" className="button">
                  View Your Transaction History
                </Link>
              </div>
            ) : null}
          </Popup>
          <div className="input-group">
            <label>Receiver</label>
            <select
              className="select-btn"
              name="select"
              onChange={(e) => select(e.target.value)}
            >
              <option value="">Select</option>
              {typeof receiver !== 'string' ? (
                receiver.map((receiver) => (
                  <option key={receiver.id} value={receiver.id}>
                    {receiver.first_name}
                  </option>
                ))
              ) : (
                <option value="">No data found</option>
              )}
            </select>
          </div>

          <div className="input-group">
            <label>Bank*</label>
            <select
              className="select-btn"
              name="select"
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Select</option>
              {typeof bankDetails !== 'string' ? (
                bankDetails.map((bankDetail) => (
                  <option key={bankDetail.id} value={bankDetail.id}>
                    {bankDetail.bank_name}
                  </option>
                ))
              ) : (
                <option value="">No data found</option>
              )}
            </select>
          </div>

          <CustomInput
            type="number"
            label="Send Amount*"
            handleChange={(e) => {
              setAmt(e.target.value);
              setConvert(e.target.value * (exchangeRate.selling - 4));
            }}
            border={amtCheck}
          />

          <p style={{ marginBottom: 20 }}>
            Transaction Fee: <strong>NRS 4</strong>
            <br />
            Total amount received:{' '}
            <strong>NRS {Number(convert).toFixed(2)}</strong>
          </p>

          {error ? (
            <p style={{ color: 'red', marginBottom: 15 }}>
              Receiver or Bank Field is missing.
            </p>
          ) : null}

          {amtLimit ? (
            <p style={{ color: 'red', marginBottom: 15 }}>
              Amount must me less than 100.
            </p>
          ) : null}

          <button
            className="button"
            onClick={() => onSubmit(selectedReceiver, sender, bank, amt)}
          >
            Transfer
          </button>
        </CustomFormLayout>
      </>
    );
  }
};

export default Transfer;
