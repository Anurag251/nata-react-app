import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../url';
import CustomInput from './custom-input.component';
import Popup from './popup.component';

const Banner = () => {
  const [convert, setConvert] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);

  const [ttn, setTtn] = useState('');
  const [ttn_details, setTtn_details] = useState('');
  const [displayPopup, setDisplayPopup] = useState(false);

  useEffect(() => {
    if (!displayPopup) {
      setTtn('');
      setTtn_details('');
    }
  }, [displayPopup]);

  const onSubmit = (ttn) => {
    setDisplayPopup(true);

    if (ttn === '') {
      setTtn_details(false);
      return 0;
    }

    const formData = new FormData();
    formData.append('ttn_number', ttn);

    fetch(url + '/checkStatus/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ttn_number === ttn) {
          setTtn_details(data);
          return 0;
        } else {
          setTtn_details(false);
          return 0;
        }
      })
      .catch((err) => {
        setTtn_details(false);
        return 0;
      });
  };

  useEffect(() => {
    if (exchangeRate === null) {
      fetch(url + '/exchangeRate/')
        .then((res) => res.json())
        .then((data) => setExchangeRate(data[0]));
    }
  }, [exchangeRate]);

  if (exchangeRate === null) return <h2 className="loading">LOADING...</h2>;
  else {
    return (
      <div className="banner">
        <Popup
          display={displayPopup}
          setDisplay={setDisplayPopup}
          setViewedTransactionId={null}
        >
          {ttn_details === '' ? (
            <h2 className="loading">LOADING...</h2>
          ) : !ttn_details ? (
            <p>No data found. TTN Number '{ttn}' is Incorrect.</p>
          ) : ttn_details.ttn_number ? (
            <>
              <h1>TTN Status for ( {ttn_details.ttn_number} )</h1>
              <div className="center">
                Verified:
                {ttn_details.verified ? (
                  <p style={{ color: 'green' }}>Yes</p>
                ) : (
                  <p style={{ color: 'red' }}>No</p>
                )}
              </div>
              <div className="center">
                Transferred:
                {ttn_details.transfer ? (
                  <p style={{ color: 'green' }}>Yes</p>
                ) : (
                  <p style={{ color: 'red' }}>No</p>
                )}
              </div>
              <div className="center">
                Processing:
                {ttn_details.processing ? (
                  <p style={{ color: 'green' }}>Yes</p>
                ) : (
                  <p style={{ color: 'red' }}>No</p>
                )}
              </div>
              <div className="center">
                Received:
                {ttn_details.received ? (
                  <p style={{ color: 'green' }}>Yes</p>
                ) : (
                  <p style={{ color: 'red' }}>No</p>
                )}
              </div>
              <div className="center">
                Rejected reason:
                {ttn_details.reject_reason !== '' ? (
                  <p>{ttn_details.reject_reason}</p>
                ) : (
                  <p>No reason yet!</p>
                )}
              </div>

              <div className="center">
                Waiting response:
                {ttn_details.waiting_response !== '' ? (
                  <p>{ttn_details.waiting_response}</p>
                ) : (
                  <p>No response yet!</p>
                )}
              </div>
            </>
          ) : null}
        </Popup>
        <div className="container">
          <div className="content">
            <h1 className="title">Move money in easy secure steps</h1>
            <p>
              Fast and easy you want to be more secure send and recives money
              sort time
            </p>
            <h3>Track Transaction Status</h3>
            <div className="input-group">
              <CustomInput
                type="text"
                placeholder="Enter your TTM Number"
                handleChange={(e) => setTtn(e.target.value)}
                value={ttn}
                required
              />
              <button onClick={() => onSubmit(ttn)}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M42.8708 5.16397C41.8703 4.1372 40.3897 3.75467 39.0092 4.15733L6.81599 13.519C5.3594 13.9237 4.32697 15.0854 4.04886 16.5611C3.76474 18.063 4.75715 19.9696 6.05368 20.7668L16.1198 26.9536C17.1522 27.5878 18.4848 27.4288 19.3391 26.5671L30.8658 14.9686C31.4461 14.3646 32.4065 14.3646 32.9867 14.9686C33.5669 15.5525 33.5669 16.4987 32.9867 17.1027L21.44 28.7032C20.5836 29.5628 20.4236 30.9016 21.0538 31.9405L27.2043 42.1075C27.9246 43.3155 29.1651 44 30.5257 44C30.6858 44 30.8658 44 31.0259 43.9799C32.5865 43.7785 33.8271 42.7115 34.2872 41.2015L43.8311 9.04958C44.2513 7.68056 43.8712 6.19073 42.8708 5.16397Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="banner-form">
            <h1 className="title">How much would you like to send</h1>
            <div className="input-form">
              <div className="input-group">
                <label>I want to send Exactly</label>
                <div className="input">
                  <input
                    type="number"
                    name="price"
                    onChange={(e) => {
                      setConvert(
                        (e.target.value * (exchangeRate.selling - 4)).toFixed(2)
                      );
                    }}
                  />
                  <div className="currency">GBR</div>
                </div>
              </div>

              <div className="input-group">
                <label>My Recipients Will Recieve</label>
                <div className="input">
                  <div className="recieve">{convert === -1 ? 0 : convert}</div>
                  <div className="currency">NRS</div>
                </div>
              </div>

              <div className="rate">
                <h6>
                  <span>Buying: </span>
                  {exchangeRate.currency} {exchangeRate.buying}
                </h6>
                <h6>
                  <span>Selling: </span>
                  {exchangeRate.currency} {exchangeRate.selling}
                </h6>
              </div>

              <div className="rate">
                <h6>
                  <span>Transition Fees:</span> NRS 4
                </h6>
              </div>

              {localStorage.getItem('token') ? (
                <Link to="/remit">
                  <button>Proceed Transfer</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button>Proceed Transfer</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Banner;
