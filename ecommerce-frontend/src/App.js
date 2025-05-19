import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Purchase from './components/Purchase';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchase" element={<Purchase />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
