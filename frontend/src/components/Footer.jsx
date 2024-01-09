import React from 'react';
import '../components/styles/Footer.scss';

const Footer = () => {

  let date = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="https://static.coincodex.com/en/resources/images/admin/coins/solana.png" alt="Logo" />
          <h1>CryptoData | Mahesh Abeykoon</h1>
        </div>
        <div className="footer-links">
        <ul>
            <li><a href="https://github.com/Mahesh-Abeykoon" target="_blank" >GitHub</a></li>
            <li><a href="https://linkedin.com/in/maheshabeykoon" target="_blank">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/mahe__sh" target="_blank" >Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
      <p className="about-section">
        This project was created as a practical test at <b>S**L**</b>. It showcases cryptocurrency data using both predefined details and real-time updates through a WebSocket server.
      </p>
      <p>&copy; {date} | Powered by CryptoCompare. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
