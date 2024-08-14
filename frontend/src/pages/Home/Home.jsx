import React, {useEffect} from 'react';
import './Home.css';
import { useNavigate, useLocation } from "react-router-dom";
import TopStores from '../../components/TopStores/TopStores';
import TopProducts from '../../components/TopProducts/TopProducts';
import api from "../../api/index";

function Home() {

  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("userData"))?.role;
  const location = useLocation();

  const emailId = location.state;


  useEffect(() => {
    api.auth.getUserDetails(emailId)
      .then((response) => {
         localStorage.setItem("userData", JSON.stringify(response));
      })
      .catch((error) => {
       
      });
  }, []);

  return (
    <>
      <div className="hero-section">
        <div class="header">
        <div className="hero-text">
      <h1>Welcome {JSON.parse(localStorage.getItem("userData"))?.username}</h1>
    </div>
        </div>
    <div className="hero-image">
    <div>
           {role === "SELLER" && ( 
            <div style={{display: "flex"}}>
            <button onClick={() => navigate("/create-store")}   style={{backgroundColor: "#1A2529", border: "none", marginRight: "30px", color: "white", padding: "10px"}}>
              Create Store
            </button>
            <button onClick={() => navigate("/add-product")}  style={{backgroundColor: "#1A2529", border: "none", marginRight: "30px", color: "white", padding: "10px"}}>
            Create Product
          </button>
          </div>
          )}
          </div>
    </div>
  </div>
  <TopStores />
  <TopProducts />
  </>
  );
}

export default Home;