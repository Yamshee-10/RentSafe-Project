import React from "react";
import { useHistory } from "react-router-dom";
import "./Orders.css";

export default function Orders() {
  const history = useHistory();

  // TEMP DATA (replace with backend later)
  const orders = [
    {
      id: 1,
      product: "DSLR Camera",
      status: "Active",
      orderDate: "12 Jan 2026",
      deliveryDate: "13 Jan 2026",
      returnDate: "18 Jan 2026",
      price: 4500,
      rentPaid: 3000,
      rentPending: 1500,
    },
    {
      id: 2,
      product: "Camping Tent",
      status: "Returned",
      orderDate: "02 Jan 2026",
      deliveryDate: "03 Jan 2026",
      returnDate: "07 Jan 2026",
      price: 2500,
      rentPaid: 2500,
      rentPending: 0,
    },
  ];

  return (
    <div className="orders-page">
      <div className="orders-header">
        <button className="back-home-btn" onClick={() => history.push("/")}>
          ← Back to Home
        </button>

        <h1>Your Orders</h1>
        <p>Track, manage, and return your rented products</p>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-top">
              <h3>{order.product}</h3>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-details">
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
              <p><strong>Return Date:</strong> {order.returnDate}</p>
              <p><strong>Product Price:</strong> ₹{order.price}</p>
              <p><strong>Rent Paid:</strong> ₹{order.rentPaid}</p>
              <p><strong>Rent Pending:</strong> ₹{order.rentPending}</p>
            </div>

            <div className="order-actions">
              <button className="cancel-btn">Cancel</button>
              <button className="return-btn">Return</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
