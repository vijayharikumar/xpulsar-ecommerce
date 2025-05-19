import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getProducts = async () => axios.get(`${API_URL}/products`);
export const getCartItems = async () => axios.get(`${API_URL}/cart`);
export const addToCart = async (product_id) => axios.post(`${API_URL}/cart`, { product_id });
export const clearCart = async () => axios.delete(`${API_URL}/cart`);
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const getColors = () => axios.get(`${API_URL}/colors`);