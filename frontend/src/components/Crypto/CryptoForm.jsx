// CryptoForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import "../styles/CryptoForm.scss";

const CryptoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/crypto', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating cryptocurrency:', error);
    }
  };

  return (
    <div className="crypto-form-container">
      <h2>Create a New Cryptocurrency</h2>
      <form onSubmit={handleSubmit} className="crypto-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="symbol">Symbol:</label>
          <input type="text" name="symbol" value={formData.symbol} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="create-btn">Create</button>
        <button onClick={() => navigate('/')} className="home-btn">Home</button>
      </form>
    </div>
  );
};

export default CryptoForm;
