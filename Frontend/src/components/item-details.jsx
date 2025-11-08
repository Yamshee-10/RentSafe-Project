// src/components/item-detail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./item-details.css";

export default function ItemDetail() {
  const { id } = useParams();
  const title = id ? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Item";

  // Create demo details (static for demo)
  const description = `Detailed demo description for ${title}. This listing is part of RentSafe's demo data and shows how the product detail view will look. It includes condition, what’s included, pick-up instructions, and expected return procedure.`;

  return (
    <main className="id-root">
      <div className="id-card">
        <div className="id-media">📦</div>
        <div className="id-body">
          <h1 className="id-title">{title}</h1>
          <p className="id-desc">{description}</p>

          <div className="id-meta">
            <div>
              <strong>Price:</strong> $12 / day (demo)
            </div>
            <div>
              <strong>Location:</strong> Near you (demo)
            </div>
          </div>

          <div className="id-actions">
            <button
              className="id-rent-btn"
              onClick={() => alert("Rent flow demo — connect to payments and booking logic.")}
            >
              Rent it
            </button>

            <Link to="/" className="id-back-link">← Back to home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
