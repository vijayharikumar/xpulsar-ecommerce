import React, { useEffect, useState } from 'react';
import { getProducts, addToCart, getCategories, getColors } from '../api';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const navigate = useNavigate();

  // Fetch products, categories, and colors 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes, colorRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getColors()
        ]);

        const enrichedProducts = productRes.data.map((product, index) => ({
          ...product,
          category: categoryRes.data[Math.floor(Math.random() * categoryRes.data.length)]?.name || "",
          color: colorRes.data[Math.floor(Math.random() * colorRes.data.length)]?.color_name || "",
          sNo: index + 1
        }));

        setProducts(enrichedProducts);
        setCategories(categoryRes.data);
        setColors(colorRes.data);
      } catch (error) {
        alert('Failed to fetch data. Please try again.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(productId);
      const response = await addToCart(productId);
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
    setAddingToCart(null);

  };

  // Filter products based on the search
  const filteredProducts = products.filter(product =>
    product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-list">
      <h2>Available Products</h2>

      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.sNo}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>${Number(product.price || 0).toFixed(2)}</td>
                <td>{product.color}</td>
                <td>
                  <button
                    onClick={() => handleAddToCart(product.product_id)}
                    disabled={addingToCart === product.product_id}
                  >
                    {addingToCart === product.product_id ? 'Adding...' : 'Add to Cart'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
