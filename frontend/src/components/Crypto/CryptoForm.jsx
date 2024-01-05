import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

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
    <div>
      <h2>Create a new cryptocurrency</h2>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label> Symbol: </label>
        <input type="text" name="symbol" value={formData.symbol} onChange={handleChange} required />
        <label> Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        <button type="submit">Create</button>
        <button onClick={() => navigate('/')}>Home</button>
      </form>
      
    </div>
  );
};

export default CryptoForm;
