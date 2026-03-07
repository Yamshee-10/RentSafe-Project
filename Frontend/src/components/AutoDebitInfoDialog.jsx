import React from "react";
import "./PaymentDialog.css";

export default function AutoDebitInfoDialog({ open, onClose, onContinue }) {

  if (!open) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-dialog">

        <h2>Enable Auto-Debit</h2>

        <div style={{ marginTop: 20 }}>
          <p>• Only the first month's rent will be charged now.</p>
          <p>• Your card details will be securely stored by Razorpay.</p>
          <p>• You will receive reminders 7 days before next billing.</p>
          <p>• You may cancel anytime before next charge.</p>
          <p>• No hidden charges.</p>
        </div>

        <div className="payment-actions">
          <button className="payment-primary" onClick={onContinue}>
            Agree & Continue
          </button>

          <button className="payment-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}