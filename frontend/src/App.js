import './App.css';

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import CreateStore from './pages/CreateStore/CreateStore';
import Register from './pages/Register/Register';
import VerifyCode from './pages/VerifyCode/VerifyCode';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './pages/AddProducts/AddProducts';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {
  return (
    <Router>
       <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/verify-code" element={<VerifyCode />}/>
          <Route path="/add-product" element={<AddProduct />}/>
          <Route path="/product/:id" element={<ProductDetail />}/>
        </Routes>
    </Router>
  );
}

export default App;
