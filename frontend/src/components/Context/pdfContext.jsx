// src/components/Context/pdfContext.js
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const PdfContext = createContext();

const PdfProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/pdfapi/get`)
      .then(res => {
        const initialData = res.data.payload;
        setData(initialData);
      })
      .catch(error => {
        console.error('Error fetching initial data:', error);
      });
  }, []);

  return (
    <PdfContext.Provider value={{ data, setData }}>
      {children}
    </PdfContext.Provider>
  );
};

PdfProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PdfProvider, PdfContext };
