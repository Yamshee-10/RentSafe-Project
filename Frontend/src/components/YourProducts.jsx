import React from "react";
import "./YourProducts.css";

const YourProducts = () => {
  // Temporary mock data (replace with backend later)
  const products = [
    {
      id: 1,
      name: "DSLR Camera",
      lentTo: "Rahul Sharma",
      lendDate: "2026-01-05",
      duration: "7 days",
      rentReceived: "₹1500",
      rentPending: "₹500",
    },
    {
      id: 2,
      name: "Electric Drill Machine",
      lentTo: "Ananya Singh",
      lendDate: "2026-01-10",
      duration: "5 days",
      rentReceived: "₹800",
      rentPending: "₹0",
    },
  ];

  return (
    <div className="your-products-container">
      <h1 className="your-products-title">Your Products</h1>
      <p className="your-products-subtitle">
        Track and manage items you have lent to others
      </p>

      <div className="your-products-grid">
        {products.map((product) => (
          <div key={product.id} className="your-product-card">
            <h3>{product.name}</h3>
            <p><strong>Lent To:</strong> {product.lentTo}</p>
            <p><strong>Lend Date:</strong> {product.lendDate}</p>
            <p><strong>Duration:</strong> {product.duration}</p>
            <p><strong>Rent Received:</strong> {product.rentReceived}</p>
            <p><strong>Rent Pending:</strong> {product.rentPending}</p>

            <button className="request-return-btn">
              Request Return
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourProducts;
