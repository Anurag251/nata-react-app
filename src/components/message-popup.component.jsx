import React from 'react';

const MessagePopup = ({ added }) => {
  if (added === true)
    return (
      <div className="message-popup success">
        Receiver Added Successfully :)
      </div>
    );
  if (added === false)
    return <div className="message-popup fail">Something went wrong :(</div>;
  if (added === 'loading')
    return <div className="message-popup loadings">Please Wait... </div>;
  if (added === 'update')
    return <div className="message-popup success">Updated Successfully!</div>;
  if (added === 'addedBankInfo')
    return (
      <div className="message-popup success">Info Added Successfully :)</div>
    );
  if (added === 'exist')
    return (
      <div className="message-popup fail">
        Bank information already Exists for this receiver.
      </div>
    );
  if (added === 'transfer')
    return (
      <div className="message-popup success">Transfered Successfully :)</div>
    );
  if (added === 'updatedPassword')
    return (
      <div className="message-popup success">
        Password Updated Successfully :)
      </div>
    );

  return <div style={{ display: 'none' }}></div>;
};

export default MessagePopup;
