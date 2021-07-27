import React, { useEffect, useState } from 'react';
import { url } from '../url';
import Popup from './popup.component';

const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState('');
  const [viewedTransactionId, setViewedTransactionId] = useState('');
  const [viewedTransaction, setViewedTransaction] = useState('');

  const [displayDetails, setDisplayDetails] = useState(false);

  useEffect(() => {
    if (typeof viewedTransactionId === 'number') {
      setDisplayDetails(true);
      transactionHistory.forEach((transaction) => {
        if (transaction.id === viewedTransactionId) {
          setViewedTransaction(transaction);
          return 0;
        }
      });
    } else {
      setDisplayDetails(false);
      setViewedTransactionId('');
    }
  }, [viewedTransactionId, transactionHistory]);

  useEffect(() => {
    if (!localStorage.getItem('id')) return 0;

    fetch(url + `/transferHistory/${localStorage.getItem('id')}/`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Token ' + localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactionHistory(data);
      })
      .catch((err) => {});
  }, []);

  const onViewStatus = (id) => {
    setViewedTransactionId(id);
  };

  const history = (transactionHistory) => {
    return (
      <div className="history-list">
        {transactionHistory.map((transaction) => (
          <div className="item" key={transaction.id}>
            <h3>
              {transaction.receiver.first_name} {transaction.receiver.last_name}
            </h3>
            <p>Transferred Amount: {transaction.amount}</p>
            <div>
              <div className="group">
                {transaction.ttn_number[0].transaction_status.recieved ===
                false ? (
                  <p style={{ color: 'red', fontSize: 14 }}>
                    Transaction in process...
                  </p>
                ) : (
                  <p style={{ color: 'green', fontSize: 14 }}>
                    Transaction Completed.
                  </p>
                )}
                <button
                  className="button"
                  onClick={() => onViewStatus(transaction.id)}
                >
                  View Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const popup = (displayDetails, setDisplayDetails, viewedTransaction) => {
    if (viewedTransaction !== '') {
      return (
        <Popup
          display={displayDetails}
          setDisplay={setDisplayDetails}
          setViewedTransactionId={setViewedTransactionId}
        >
          <div className="center">
            Status:
            {viewedTransaction.ttn_number[0].transaction_status.processing ? (
              <p style={{ color: 'orange' }}>Processing...</p>
            ) : viewedTransaction.ttn_number[0].transaction_status.recieved ? (
              <p style={{ color: 'green' }}>Recieved.</p>
            ) : null}
          </div>

          <h3>
            <strong>Transferred Amount: </strong> {viewedTransaction.amount}
          </h3>

          <h1>
            {viewedTransaction.receiver.first_name}{' '}
            {viewedTransaction.receiver.first_name}
          </h1>

          <p>
            <strong>TTN Number:</strong>{' '}
            {viewedTransaction.ttn_number[0].tracking_number}
          </p>

          <p>
            <strong>Citizenship Number:</strong>{' '}
            {viewedTransaction.receiver.citizenship_number}
          </p>

          <p>
            <strong>Contact Number:</strong>{' '}
            {viewedTransaction.receiver.contact_no}
          </p>

          <p>
            <strong>Address:</strong> {viewedTransaction.receiver.address}
          </p>
        </Popup>
      );
    } else {
      return <div></div>;
    }
  };

  if (transactionHistory === '') return <h2 className="loading">LOADING...</h2>;
  else {
    return (
      <div className="history">
        <div className="container">
          {popup(displayDetails, setDisplayDetails, viewedTransaction)}
          {history(transactionHistory)}
        </div>
      </div>
    );
  }
};

export default TransactionHistory;
