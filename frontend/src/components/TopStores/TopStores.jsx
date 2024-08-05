import React from 'react';
import './TopStores.css';
import { DashboardImage } from '../../assets';

const brands = [
    { name: 'Staples', logo: 'path/to/staples-logo.png', delivery: 'Delivery within 24 hours' },
    { name: 'Sprouts', logo: 'path/to/sprouts-logo.png', delivery: 'Delivery within 24 hours' },
    { name: 'Grocery Outlet', logo: 'path/to/grocery-outlet-logo.png', delivery: 'Delivery within 24 hours' },
    { name: 'Mollie Stones', logo: 'path/to/mollie-stones-logo.png', delivery: 'Delivery within 24 hours' },
  ];

function TopStores() {
  return (
    <section className="top-stores">
        <h2>Our Top Stores</h2>
        <div className="brand-cards">
          {brands.map((brand, index) => (
            <div className="brand-card" key={index}>
              <img src={brand.logo} alt={`${brand.name} logo`} />
              <div className="brand-info">
                <h3>{brand.name}</h3>
                <p>by {brand.delivery}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}

export default TopStores;
