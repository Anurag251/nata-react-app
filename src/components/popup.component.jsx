import React from 'react';

const Popup = ({ display, setDisplay, setViewedTransactionId, children }) => {
  return (
    <div className={`popup-bg ${display ? 'show' : ''}`}>
      <div className={`popup ${display ? 'show' : ''}`}>
        <div
          className="popup-close-btn"
          onClick={() => {
            setDisplay(false);
            if (setViewedTransactionId !== null) {
              setViewedTransactionId('');
            }
          }}
        >
          <i className="fas fa-times"></i>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
