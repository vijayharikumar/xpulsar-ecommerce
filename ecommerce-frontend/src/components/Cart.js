import React, { useEffect, useState } from 'react';
import { getCartItems, clearCart, getCategories, getColors } from '../api';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [clearing, setClearing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, categoryRes, colorRes] = await Promise.all([
          getCartItems(),
          getCategories(),
          getColors(),
        ]);

        setCartItems(cartRes.data);
        setCategories(categoryRes.data);
        setColors(colorRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClearCart = async () => {
    try {
      setClearing(true);
      await clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handlePurchase = () => {
    navigate('/purchase');
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getRandomCategory = () => {
    if (categories.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].name;
  };

  const getRandomColors = () => {
    if (colors.length === 0) return '';
    const randomColorCount = Math.floor(Math.random() * 3) + 1;
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());
    return shuffledColors.slice(0, randomColorCount).map(c => c.color_name).join(', ');
  };


  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems?.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Category</th>
                <th>Colors</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item?.cart_item_id}>
                  <td>{item.name}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>{getRandomCategory()}</td>
                  <td>{getRandomColors()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total: ${calculateTotal()}</h3>

          <button onClick={handleClearCart} disabled={clearing}>
            {clearing ? 'Clearing Cart...' : 'Clear Cart'}
          </button>

          <button onClick={handlePurchase} className="purchase-button">
            Purchase Now
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
