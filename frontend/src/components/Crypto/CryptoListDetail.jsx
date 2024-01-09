import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { fetchPredefinedData } from './api';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../styles/CryptoListDetail.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../Header";
const CryptoListDetail = () => {
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [username, setUsername] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  const [predefinedCryptos, setPredefinedCryptos] = useState([]);
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
        const realTimeData = await fetchPredefinedData();
        setPredefinedCryptos(realTimeData);
            
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
    {/*  <div> 
        <h2>Top Cryptocurrencies</h2>
        <ol>
          {predefinedCryptos.map((crypto) => (
            <li key={crypto.name}>
              {/* <span><strong>Name:</strong> {crypto.name}</span>
              <span><strong> Symbol:</strong> {crypto.symbol}</span>
              <span><strong> Price:</strong> {crypto.current_price.toFixed(2)}</span> */}
              {/* <img src={crypto.image}></img> */}
              {/* </li> */}
               {/* ))}  */}
         {/* </ol>   */}
            {/*  </div> */}
          
    <Header username={username} onLogout={Logout} />
        {/* {predefinedCryptos.map((cry) => (
          <img key={cry.name} src={cry.image} alt={cry.name} />
        ))}
      */}
    <div className="realtime-cryptos">
      
      <h1>Top Cryptocurrencies</h1>
      {webSocketData.length > 0 ? (
        <div>
          {webSocketData.map((crypto) => (
            <ul key={crypto.symbol}>
              <div>
              {predefinedCryptos.map((predifined) => (
                  predifined.symbol === crypto.symbol && (
                <img key={predifined.name} src={predifined.image} alt={predifined.name} height="100" />
                  )))}
                <h3 className='cypto-name'>{crypto.name}</h3>
                <h3 className='cypto-symbol'>{crypto.symbol}</h3>
                <h3 className='cypto-price'>{crypto.price.toFixed(5)}</h3>
              </div>
            </ul>
          ))}
      </div>
      ) : (
        <p>Waiting for WebSocket data...</p>
      )}
    </div>

      <div className="user-cryptos">
        <h2>Add Your Favourites Cryptos Here!..</h2>

        {!id && <button onClick={() => navigate('/create-crypto')}>Add +</button>}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto._id}>
                <td>{crypto.name}</td>
                <td>{crypto.symbol}</td>
                <td>{crypto.price}</td>
                <td>
                  <button onClick={() => navigate(`/update/${crypto._id}`)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(crypto._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default CryptoListDetail;
