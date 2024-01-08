import axios from 'axios';

const baseURL = 'http://localhost:5001'; // Replace with your actual backend server URL

const api = axios.create({
  baseURL,
});

export const fetchCryptos = async () => {
  try {
    const response = await api.get('/all-cryptos');
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};

export const createCrypto = async (formData) => {
  try {
    const response = await api.post('/crypto', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating cryptocurrency:', error);
    throw error;
  }
};

export const fetchCryptoById = async (id) => {
  try {
    const response = await api.get(`/crypto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency details:', error);
    throw error;
  }
};

export const updateCrypto = async (id, formData) => {
  try {
    const response = await api.put(`/crypto/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating cryptocurrency:', error);
    throw error;
  }
};

export const deleteCryptoById = async (id) => {
  try {
    const response = await api.delete(`/crypto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting cryptocurrency:', error);
    throw error;
  }
};
//comment predifiend data since live data streaming via "ws";
// export const fetchPredefinedData = async () => {
//   try {
//     const response = await api.get('/predefined-cryptos');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching predefined data:', error);
//     throw error;
//   }
// };
export default api;
