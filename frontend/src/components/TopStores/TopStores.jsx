import React, { useEffect, useState } from 'react';
import './TopStores.css';
import { DashboardImage } from '../../assets';
import api from "../../api/index";

function TopStores() {

  const [stores, setStores] = useState();
  const [loading, setLoading] = useState(false);
  console.log(stores);

  useEffect(() => {
      const fetchStores = async () => {
          try {
            setLoading(true);
              const response = await api.store.getStores();
              if (response) {
                  setStores(response);
              }
          } catch (error) {
              console.error('Error fetching events:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchStores();
  }, []);
  return (
    <section className="top-stores">
        <h2>Our Top Stores</h2>
        <div className="brand-cards">
          {stores?.map((store, index) => (
            <div className="brand-card" key={index}>
              <img src={store.imageUrl} alt={`${store.storeName} logo`} width="100" height="100" style={{borderRadius: "25px"}}/>
              <div className="brand-info">
                <h3>{store.storeName}</h3>
                <p>{store.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}

export default TopStores;
