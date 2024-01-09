import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './styles/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({ username, onLogout }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img
            src="https://static.coincodex.com/en/resources/images/admin/coins/solana.png"
            alt="Crypto App Logo"
            className="logo"
          />
          <h1>CryptoData</h1>
      </div>
      <div className="user-info">
        <p>User: {username}</p>
        <button onClick={handleLogout}>          
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
