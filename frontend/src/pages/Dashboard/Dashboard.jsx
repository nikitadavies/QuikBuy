import React from 'react';
import './Dashboard.css';
import { DashboardImage } from '../../assets';
import TopStores from '../../components/TopStores/TopStores';

function Dashboard() {
  return (
    <>
      <div className="hero-section">
        <div class="header">
        <div className="hero-text">
      <h1>Welcome to QuikBuy</h1>
      <p>Your one-stop shop for all your needs, with unbeatable prices and convenience.</p>
      <button className="learn-more">Shop Now</button>
    </div>
        </div>
    <div className="hero-image">
      <img src={DashboardImage} alt="QuikBuy Products" />
    </div>
  </div>
  <TopStores />
    </>

  

  );
}

export default Dashboard;
