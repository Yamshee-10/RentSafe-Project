import React, { useState } from "react";
import "./PaymentDialog.css";
import api from "../api/axios";
import AutoDebitInfoDialog from "./AutoDebitInfoDialog";

export default function PaymentDialog({ 
  open, 
  onClose, 
  user, 
  product, 
  rentalDays, 
  rentalCost,
  cartItems,
  totalCost,
  onPaymentSuccess
}) {
 
 
  // Adding these two console.log to check if open is false or if user is undefined
  console.log("PaymentDialog open:", open);
  console.log("PaymentDialog user:", user);

// adding new variables 22-25
  const firstMonthTotal = cartItems.reduce((sum, item) => {
    const pricePerMonth = Number(item.Product?.priceRange || 0);
    return sum + pricePerMonth;
  }, 0);


  if (!open || !user) return null;

  // Determine if this is cart checkout or single product rental
  const isCartCheckout = !!cartItems && cartItems.length > 0;
  const isRental = !!product || isCartCheckout;
  
  let amount, description, paymentItems = [];
  
  if (isCartCheckout) {
    // amount = Math.round(totalCost * 100); // Amount in paise
    // chnaging from 31-36
    amount = Math.round(firstMonthTotal * 100);
    description = `Cart Checkout - ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`;
    paymentItems = cartItems;
  } else if (isRental && product) {
    amount = Math.round(rentalCost * 100);
    description = `Product Rental - ${product.productName} for ${rentalDays} days`;
  } else {
    amount = 9900; // Subscription
    description = "Monthly Subscription - ₹99/month";
  }

  const [loading, setLoading] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [autoDebitOpen, setAutoDebitOpen] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("HANDLE PAYMENT TRIGGERED");
    try {
      setLoading(true);
      setPaymentStarted(true);

      const paymentData = {
        user_id: user.user_id,
        amount: amount,
        description: description,
      };

      if (isCartCheckout) {
        // paymentData.cart_items = cartItems.map(item => ({
        //   product_id: item.id,
        //   rental_days: item.rentalDays,
        // }));
        // new code snippet 69-75
        paymentData.cart_items = cartItems.map(item => ({
          product_id: item.id,
          total_months: item.selectedMonths,
          paid_months: 1,
          remaining_months: item.selectedMonths - 1,
          price_per_month: Number(item.Product?.priceRange || 0)
        }));
      } else if (isRental && product) {
        paymentData.product_id = product.id;
        paymentData.rental_days = rentalDays;
      }

      // Step 1: Create Razorpay order
      const orderResponse = await api.post("/payments/create-order", paymentData);

      const { order_id, currency, key_id } = orderResponse.data;

      console.log("[FRONTEND] Order created:", order_id);

      // Step 2: Initialize Razorpay and open payment window
      if (!window.Razorpay) {
        alert("Razorpay script not loaded");
        setLoading(false);
        setPaymentStarted(false);
        return;
      }

      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: "RentSafe",
        description: description,
        order_id: order_id,
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user.user_id,
            };

            if (isCartCheckout) {
              verifyData.cart_items = cartItems.map(item => ({
                product_id: item.id,
                rental_days: item.rentalDays,
              }));
            } else if (isRental && product) {
              verifyData.product_id = product.id;
            }

            const verifyResponse = await api.post("/payments/verify", verifyData);

            console.log("[FRONTEND] Payment verified:", verifyResponse.data);

            // Payment successful
            if (isCartCheckout) {
              alert("✅ Payment successful! Your cart items have been booked.");
            } else if (isRental) {
              alert("✅ Payment successful! Your rental booking is confirmed.");
            } else {
              alert("✅ Payment successful! You are now a premium member.");
            }

            onClose();
            if (onPaymentSuccess) {
              onPaymentSuccess();
            }
            // Optionally reload page to show updated status
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } catch (error) {
            console.error("[FRONTEND] Verification error:", error);
            alert("Payment verification failed. Please contact support.");
            setLoading(false);
            setPaymentStarted(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          user_id: user.user_id,
          type: isCartCheckout ? "cart" : (isRental ? "rental" : "subscription"),
        },
        theme: {
          color: "#ef3b5a",
        },
        modal: {
          ondismiss: () => {
            console.log("[FRONTEND] Payment cancelled by user");
            setLoading(false);
            setPaymentStarted(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("[FRONTEND] Payment error:", error);
      alert(error.response?.data?.message || "Failed to initiate payment");
      setLoading(false);
      setPaymentStarted(false);
    }
  };

  return (
    <div className="payment-overlay" role="dialog" aria-modal="true">
      <div className="payment-dialog">
        <button
          className="payment-close"
          onClick={onClose}
          aria-label="Close"
          disabled={loading}
        >
          ×
        </button>

        <div className="payment-header">
          <h2 className="payment-title">
            {isCartCheckout ? "Checkout - Review Order" : isRental ? "Confirm Rental" : "Unlock Premium Features"}
          </h2>
          <p className="payment-subtitle">
            {isCartCheckout
              ? `Complete your purchase for ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`
              : isRental
              ? "Complete your booking with secure payment"
              : "Join thousands of users enjoying premium benefits"}
          </p>
        </div>

        <div className="payment-content">
          {/* Cart Checkout */}
          {isCartCheckout && (
            <div className="subscription-card">
              <div className="cart-items-summary">
                <h3>Order Items</h3>
                {cartItems.map((item) => {
                  const itemCost = (item.pricePerMonth * item.rentalDays) / 30;
                  return (
                    <div key={item.id} className="checkout-item">
                      {item.image && (
                        <img
                          src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`}
                          alt={item.productName}
                          className="checkout-item-image"
                        />
                      )}
                      {/* <div className="checkout-item-details">
                        <strong>{item.productName}</strong>
                        <p>{item.rentalDays} days</p>
                      </div>
                      <div className="checkout-item-price">₹{itemCost.toFixed(2)}</div> */}
                    </div>
                  );
                })}
              </div>

              {/* <div className="price-section">
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="number">{totalCost.toFixed(0)}</span>
                </div>
                <p className="price-note">Total for all items • Secure payment</p>
              </div>

              <div className="rental-details">
                <div className="detail-row">
                  <span>Items:</span>
                  <strong>{cartItems.length}</strong>
                </div>
                <div className="detail-row total">
                  <span>Total Amount:</span>
                  <strong>₹{totalCost.toFixed(2)}</strong>
                </div>
              </div> */}
              {/* new code snippet 244-261*/}
              <div className="price-section">
                <div className="detail-row">
                  <span>Total Contract Value:</span>
                  <strong>₹{totalCost.toFixed(2)}</strong>
                </div>

                <div className="detail-row">
                  <span>Pay Now (1st Month):</span>
                  <strong>₹{firstMonthTotal.toFixed(2)}</strong>
                </div>

                <div className="detail-row total">
                  <span>Remaining Balance:</span>
                  <strong>
                    ₹{(totalCost - firstMonthTotal).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Single Product Rental */}
          {!isCartCheckout && isRental && product && (
            <div className="subscription-card">
              <div className="rental-product-info">
                {product.image && (
                  <img
                    src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                    alt={product.productName}
                    className="rental-product-image"
                  />
                )}
                <div className="rental-product-details">
                  <h3>{product.productName}</h3>
                  <p className="rental-description">{product.description}</p>
                </div>
              </div>

              <div className="price-section">
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="number">{rentalCost.toFixed(0)}</span>
                  <span className="period">for {rentalDays} days</span>
                </div>
                <p className="price-note">₹{product.pricePerMonth}/month • Secure payment</p>
              </div>

              <div className="rental-details">
                <div className="detail-row">
                  <span>Product:</span>
                  <strong>{product.productName}</strong>
                </div>
                <div className="detail-row">
                  <span>Duration:</span>
                  <strong>{rentalDays} days</strong>
                </div>
                <div className="detail-row">
                  <span>Price per month:</span>
                  <strong>₹{product.pricePerMonth}</strong>
                </div>
                <div className="detail-row total">
                  <span>Total Amount:</span>
                  <strong>₹{rentalCost.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Card */}
          {!isRental && (
            <div className="subscription-card">
              <div className="price-section">
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="number">99</span>
                  <span className="period">/month</span>
                </div>
                <p className="price-note">Cancel anytime, no questions asked</p>
              </div>

              <div className="benefits-list">
                <h3>Premium Benefits</h3>
                <ul>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>List unlimited items for rent</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Priority customer support</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Advanced analytics dashboard</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Verified seller badge</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Featured listings</span>
                  </li>
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="badge">
                  <span className="badge-icon">🔒</span>
                  <span>Secure Payments</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">🛡️</span>
                  <span>Buyer Protected</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">✓</span>
                  <span>100% Safe</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="payment-actions">
          {/* <button
            className="payment-primary"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading && paymentStarted ? "Processing..." : "💳 Pay with Razorpay"}
          </button> */}
          {/* adding auto-debit option */}
           <button
            className="payment-primary"
            onClick={() => setAutoDebitOpen(true)}
          >
            💳 Proceed to Auto Debit
          </button>
          <button
            className="payment-secondary"
            onClick={onClose}
            disabled={loading}
          >
            {isCartCheckout ? "Continue Shopping" : isRental ? "Cancel booking" : "Skip for now"}
          </button>
          {/* adding auto-debit logic */}
          <AutoDebitInfoDialog
            open={autoDebitOpen}
            onClose={() => setAutoDebitOpen(false)}
            onContinue={async () => {
              setAutoDebitOpen(false);

              const response = await api.post("/subscription/create", {
                user_id: user.user_id,
                amount: amount,
                total_months: 12
              });

              const { subscription_id, key_id } = response.data;

              const options = {
                key: key_id,
                subscription_id: subscription_id,
                name: "RentSafe",
                description: "Rental Auto Debit Plan",
                handler: function (response) {
                  alert("Subscription activated successfully!");
                  onClose();
                },
                prefill: {
                  name: user.name,
                  email: user.email,
                  contact: user.phone,
                },
                theme: { color: "#ef3b5a" }
              };

              const razorpay = new window.Razorpay(options);
              razorpay.open();
            }}
          />
        </div>

        <p className="payment-footer">
          {isCartCheckout
            ? "🎉 Secure your order with encrypted payment!"
            : isRental
            ? "🎉 Secure your rental with encrypted payment!"
            : "🎉 Complete your payment to unlock all features and get started!"}
        </p>
      </div>
    </div>
  );
}
