import React, { createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const send = async (inputText) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/answer`, {
        inputText: inputText,
      });

      console.log('Data sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ send }}>
      {children}
    </AppContext.Provider>
  );
};