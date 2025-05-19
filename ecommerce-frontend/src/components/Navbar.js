import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { getCartItems } from '../api';

function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    fetchCartItemCount();

    // Setup real-time updates
    intervalRef.current = setInterval(fetchCartItemCount, 3000);

    // Clean up interval on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const fetchCartItemCount = async () => {
    try {
      const response = await getCartItems();
      const totalItems = response?.data.reduce((acc, item) => acc + item.quantity, 0);
      setCartItemCount(totalItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">My E-Commerce</Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">Products</Link>
        <Link to="/cart">
          Cart {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
