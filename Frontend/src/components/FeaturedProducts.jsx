import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured-products.css";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("Fetched products:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.warn("Unexpected data format from API");
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="featured-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="featured-error">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="featured-empty">No products available</div>;
  }

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Available Items to Rent</h2>
        <p>Browse our collection of items available for rent</p>
      </div>

      <div className="featured-grid">
        {products.map((product) => (
          <div key={product.id} className="featured-card">
            <div className="featured-image-wrapper">
              <img
                src={`http://localhost:5000/uploads/${product.imageUrl}`}
                alt={product.productName}
                className="featured-image"
              />
            </div>

            <div className="featured-info">
              <h3 className="featured-title">{product.productName}</h3>
              <p className="featured-description">{product.description}</p>

              <div className="featured-meta">
                <p className="featured-price">₹{parseFloat(product.priceRange || 0).toFixed(0)} / month</p>
                <p className="featured-period">
                  Min: {product.minRentalPeriod} month
                </p>
              </div>

              <Link
                to={`/item/${product.id}`}
                className="featured-btn"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
