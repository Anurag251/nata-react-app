import React, { createContext, useState } from 'react';

export const TokenContext = createContext();

const TokenContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const changeToken = (token) => {
    setToken(token);
  };

  return (
    <TokenContext.Provider value={{ token, changeToken }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
