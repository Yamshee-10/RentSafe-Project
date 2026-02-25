import React, { useEffect, useState } from "react";
import axios from "axios";
import "./YourProducts.css";

const YourProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUserAndProducts = async () => {
    try {
      // Get logged in user from session
      const userRes = await axios.get(
        "http://localhost:5000/api/auth/me",
        { withCredentials: true }
      );

      // const loggedUser = userRes.data;
      const loggedUser = userRes.data.user;

      // Fetch lent products using user_id
      const productRes = await axios.get(
        `http://localhost:5000/api/products/lent/${loggedUser.user_id}`,
        { withCredentials: true }
      );

      console.log("LENT PRODUCTS:", productRes.data);
      setProducts(productRes.data);
      setLoading(false);
      
    } catch (err) {
      setLoading(false);
      console.error("User not logged in or fetch failed:", err);
    }
  };

    fetchUserAndProducts();
  }, []);

  const handleRequestReturn = async (productId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/products/request-return/${productId}`,
        {},
        { withCredentials: true }
      );

      alert("Return request sent successfully");
    } catch (error) {
      console.error("Return request error:", error);
    }
  };

  return (
    <div className="your-products-container">
      <h1 className="your-products-title">Your Products</h1>
      <p className="your-products-subtitle">
        Track and manage items you have lent to others
      </p>

      {loading ? (
        <h3 className="empty-text">Loading your products...</h3>
      ) : products.length === 0 ? (
        <p className="empty-text">You haven't lent any products yet.</p>
      ) : (
        <div className="your-products-grid">
          {products.map((product) => (
            <div key={product.id} className="your-product-card">
              <div className="product-image-wrapper">
                <img
                  src={`http://localhost:5000/uploads/${product.imageUrl}`}
                  alt={product.productName}
                />
              </div>

              <div className="product-content">
                <h3>{product.productName}</h3>
                <p className="description">{product.description}</p>

                <div className="product-meta">
                  <span>₹{product.priceRange} / month</span>
                  <span>Min: {product.minRentalPeriod} months</span>
                </div>
                <p>Lender: {product.User?.name}</p>

                <button
                  className="request-return-btn"
                  onClick={() => handleRequestReturn(product.id)}
                >
                  Request Return
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourProducts;
