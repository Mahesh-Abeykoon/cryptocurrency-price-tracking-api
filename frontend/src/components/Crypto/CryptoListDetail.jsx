import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { fetchPredefinedData } from './api';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CryptoListDetail = () => {
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [username, setUsername] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  const [predefinedCryptos, setPredefinedCryptos] = useState([]);
  const { id } = useParams();  


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cookies.token) {
          navigate('/login');
        }

        const { data } = await axios.post(
          'http://localhost:5001',
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
              setUsername(user);
              
              if (!status) {
                removeCookie('token');
                navigate('/login');
              }
      
        // Fetch all data when the page loads
        const response = await api.get('/all-cryptos');
        setCryptos(response.data);

        // Fetch predefined data initially
        const realTimeData = await fetchPredefinedData();
        setPredefinedCryptos(realTimeData);



      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, cookies, navigate, removeCookie, predefinedCryptos]);

  const handleDelete = async (cryptoId) => {
    try {
      await api.delete(`/crypto/${cryptoId}`);
      const response = await api.get('/all-cryptos');
      setCryptos(response.data);
    } catch (error) {
      console.error('Error deleting cryptocurrency:', error);
    }
  };

  const Logout = () => {
    removeCookie('token');
    navigate('/login');
  };

  return (
    <div>
      <div>
        <h2>Top Cryptocurrencies</h2>
        <ol>
          {predefinedCryptos.map((crypto) => (
            <li key={crypto.name}>
              <span><strong>Name:</strong> {crypto.name}</span>
              <span><strong> Symbol:</strong> {crypto.symbol}</span>
              <span><strong> Price:</strong> {crypto.current_price.toFixed(2)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2>Cryptocurrencies</h2>
        <h4>Welcome <span>{username}</span></h4>
        <button onClick={Logout}>Logout</button>
        <ol>
          {cryptos.map((crypto) => (
            <li key={crypto._id}>
              <span><strong>Name:</strong>{crypto.name}</span>
              <span><strong> Symbol:</strong>{crypto.symbol}</span>
              <span><strong> Price:</strong>{crypto.price} </span>
              <button onClick={() => navigate(`/update/${crypto._id}`)}> Update</button>
              <button onClick={() => handleDelete(crypto._id)}> X</button>
            </li>
          ))}
        </ol>
        {!id && <button onClick={() => navigate('/create-crypto')}>Add Crypto</button>}
      </div>
      </div>
  );
};

export default CryptoListDetail;
