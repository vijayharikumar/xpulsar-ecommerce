import React from 'react';
import './Purchase.css';
import { Link } from 'react-router-dom';

function Purchase() {
  return (
    <div className="purchase-page">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
      <p>Keep shopping for more amazing products!</p>
      
      <Link to="/" className="continue-shopping-btn">
        Continue Shopping
      </Link>
    </div>
  );
}

export default Purchase;
