import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CryptoListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [username, setUsername] = useState('');
  const [cookies, removeCookie] = useCookies([]);
  const [showHomePageToast, setShowHomePageToast] = useState(false);

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

        if (status && !showHomePageToast) {
        //   toast(`Home Page`);
          setShowHomePageToast(true);
        } else if (!status) {
          removeCookie('token');
          navigate('/login');
          toast('You are logged out.');
        }

        const response = await api.get('/all-cryptos');
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
      }
    };

    fetchData();
  }, [id, cookies, navigate, removeCookie, showHomePageToast]);

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
      <h2>Cryptocurrencies</h2>
      <h4>
        Welcome <span>{username}</span>
      </h4>
      <button onClick={Logout}>Logout</button>
      <ol>
        {cryptos.map((crypto) => (
          <li 
            key={crypto._id}>
            <span><strong>Name:</strong>{crypto.name}</span>
            <span><strong> Symbol:</strong>{crypto.symbol}</span>
            <span><strong> Price:</strong>{crypto.price} </span>
            
            <button onClick={() => navigate(`/update/${crypto._id}`)}> Update</button>
            <button onClick={() => handleDelete(crypto._id)}> X</button>
          </li>
        ))}
      </ol>
      {!id && <button onClick={() => navigate('/create-crypto')}>Add Crypto</button>}
       {/* <Link to={'/create-crypto'}>Add Crypto</Link> */}

      <div className="home_page">
        <ToastContainer
          className="custom-toast"
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default CryptoListDetail;
