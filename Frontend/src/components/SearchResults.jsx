import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./search-results.css";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // supports both ?q= and ?query=
  const searchQuery =
    (params.get("q") || params.get("query") || "").toLowerCase();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery)
  );

  if (loading) return <h2 className="sr-heading">Loading results...</h2>;

  return (
    <main className="sr-root">
      <h2 className="sr-heading">Search results for “{searchQuery}”</h2>

      {filteredProducts.length === 0 ? (
        <p className="sr-heading">No matching items found.</p>
      ) : (
        <div className="sr-grid">
          {filteredProducts.map((item) => (
            <div key={item.id} className="sr-card">
              <div className="sr-card-media">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.productName}
                  className="sr-image"
                />
              </div>

              <h3 className="sr-title">{item.productName}</h3>
              <p className="sr-desc">{item.description}</p>
              <p className="sr-price">₹{item.priceRange} / month</p>
              <p className="sr-location">Min rental: {item.minRentalPeriod} month</p>

              <Link
                to={`/item/${item.id}`}
                className="sr-rent-btn"
              >
                Rent it
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}




