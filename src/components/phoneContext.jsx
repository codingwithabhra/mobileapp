import React from 'react'
import { useContext, createContext, useState } from 'react'

const phoneContext = createContext();
export const usePhoneContext = () => useContext(phoneContext);

const phoneProvider = () => {
  
}

export default phoneProvider
