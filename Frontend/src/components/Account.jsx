import React from "react";
import { useHistory } from "react-router-dom";
import "./Account.css";

export default function Account() {
  const history = useHistory();

  const cards = [
    {
      title: "My Orders",
      desc: "View your past and ongoing rentals, track order status, and manage returns.",
    },
    {
      title: "Profile Settings",
      desc: "Update your personal information, contact details, and account preferences.",
    },
    {
      title: "Billing & Payments",
      desc: "Manage payment methods, view invoices, and track transaction history.",
    },
    {
      title: "KYC & Documentation",
      desc: "Upload and verify identity documents to ensure secure rentals.",
    },
    {
      title: "Your Address",
      desc: "Add or update delivery and pickup addresses for a smooth rental experience.",
    },
  ];

  return (
    <div className="account-page">
      <div className="account-header">
        <button
          className="back-home-btn"
          onClick={() => history.push("/")}
        >
          ← Back to Home
        </button>

        <h1>Your Account</h1>
        <p>Manage your RentSafe account settings and preferences</p>
      </div>

      <div className="account-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="account-card"
            onClick={() => console.log(card.title)}
          >
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <span className="card-action">Manage →</span>
          </div>
        ))}
      </div>
    </div>
  );
}





