import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext, useContext } from 'react'

const Crypto = createContext();


const CryptoContext = ({ children }) => {

  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")

  useEffect(() => {
    if(currency === "USD") {setSymbol("$")}
    else if(currency === "CAD") {setSymbol("$")}
  }, [currency])


  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext
export const CryptoState = () => {
  return useContext(Crypto)
}