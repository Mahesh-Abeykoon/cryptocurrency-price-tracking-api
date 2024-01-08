import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CryptoListDetail = () => {
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [username, setUsername] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  // const [predefinedCryptos, setPredefinedCryptos] = useState([]);
  const { id } = useParams();  

  const [webSocketData, setWebSocketdata] = useState([])

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

        // // Fetch predefined data initially
        // const realTimeData = await fetchPredefinedData();
        // setPredefinedCryptos(realTimeData);
            
        //
        const socket = new WebSocket('ws://localhost:5001');

          socket.onopen = () => {
            console.log('WebSocket connection opened');
          };

          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setWebSocketdata(data);
          };

          socket.onerror = (error) => {
            console.error('WebSocket connection error:', error);
          };

          socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
          };

    return () => {
      socket.close();
    };


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, cookies, navigate, removeCookie]);

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
      {/* <div>
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
      </div> */}
    <div>
      <h1>Top Cryptocurrencies</h1>
      <h1>Your Component</h1>
      {webSocketData.length > 0 ? (
        <div>
          {webSocketData.map((crypto) => (
            <div key={crypto.symbol} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h3>{crypto.name}</h3>
              <p>Symbol: {crypto.symbol}</p>
              <p>Price: {crypto.price}</p>
              <p>Market Cap: {crypto.marketCap}</p>
              <p>Change (24h): {crypto.change24h}</p>
              {/* Add more information as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Waiting for WebSocket data...</p>
      )}
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
