import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/CryptoUpdatePage.scss";

const CryptoUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cryptoDetail, setCryptoDetail] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    symbol: '',
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailResponse = await api.get(`/crypto/${id}`);
        setCryptoDetail(detailResponse.data);
        setUpdatedData({
          name: detailResponse.data.name,
          symbol: detailResponse.data.symbol,
          price: detailResponse.data.price,
        });
      } catch (error) {
        console.error('Error fetching cryptocurrency details:', error);
      }
    };

    fetchData();
  }, [id, navigate, setUpdatedData]);

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    toast('Cryptocurrency updated successfully.');
    try {
      await api.put(`/crypto/${id}`, updatedData);
      toast('Cryptocurrency updated successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error updating cryptocurrency:', error);
      toast('Error updating cryptocurrency. Please try again.');
    }

  };

  return (
    <div className="crypto-form-container">
      <h2>Update Cryptocurrency</h2>
      {cryptoDetail && (
        <form className="crypto-form" onSubmit={handleUpdate}>
          <label> Name: </label>
          <input
            type="text"
            name="name"
            value={updatedData.name}
            onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
            required
          />
          <label> Symbol: </label>
          <input
            type="text"
            name="symbol"
            value={updatedData.symbol}
            onChange={(e) => setUpdatedData({ ...updatedData, symbol: e.target.value })}
            required
          />
          <label> Price:</label>
          <input
            type="number"
            name="price"
            value={updatedData.price}
            onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
            required
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </form>
      )}
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

export default CryptoUpdatePage;
