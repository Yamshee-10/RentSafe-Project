import React from "react";
import "./how-it-works.css";

const HowItWorks = () => {
  return (
    <div className="hiw-container">
      {/* Hero Section */}
      <section className="hiw-hero">
        <h1>How RentSafe Works</h1>
        <p>
          RentSafe is a community-driven platform where people can safely lend
          and rent everyday items. From cameras to tools, we make sharing easy,
          secure, and profitable.
        </p>
      </section>

      {/* Step Sections */}
      <section className="hiw-steps">
        <div className="hiw-step">
          <h2>1️⃣ Create & List</h2>
          <p>
            Sign up and list your unused items. Add pictures, set the daily
            rent, and choose a security deposit amount.
          </p>
        </div>

        <div className="hiw-step">
          <h2>2️⃣ Rent & Earn</h2>
          <p>
            Borrowers can browse items, book them, and pay securely using our
            built-in payment system (Stripe). Lenders earn passive income every
            time their product is rented.
          </p>
        </div>

        <div className="hiw-step">
          <h2>3️⃣ Pickup & Return with QR Verification</h2>
          <p>
            Every rental comes with a unique <b>QR code</b> for both pickup and
            return.
          </p>
          <ul>
            <li>Scan at pickup to confirm possession</li>
            <li>Scan at return to mark the item returned</li>
            <li>Automatic status update in the system</li>
          </ul>
          <p>
            If the renter fails to scan the QR by the due date, the system marks
            the item as <b>“Overdue”</b>.
          </p>
        </div>

        <div className="hiw-step">
          <h2>4️⃣ Automatic Reminders</h2>
          <p>
            RentSafe automates follow-ups for returns so lenders don’t need to
            chase renters.
          </p>
          <ul>
            <li>📅 Level 1: Reminder before due date</li>
            <li>⚠️ Level 2: Warning 1–2 days after due date</li>
            <li>💸 Level 3: Deposit is transferred to the owner</li>
          </ul>
        </div>

        <div className="hiw-step">
          <h2>5️⃣ Security Deposit System</h2>
          <p>
            All transactions are processed through <b>Stripe</b>. A deposit is
            held securely until the item is returned and verified through QR
            scan. If not returned, the deposit automatically goes to the owner
            as compensation.
          </p>
        </div>

        <div className="hiw-step">
          <h2>6️⃣ Trusted Community</h2>
          <p>
            Every user on RentSafe is verified via phone and ID. Ratings and
            reviews help maintain a trustworthy community where items are
            treated responsibly.
          </p>
        </div>
      </section>

      {/* Why RentSafe Section */}
      <section className="hiw-benefits">
        <h2>Why Choose RentSafe?</h2>
        <div className="hiw-benefit-grid">
          <div className="hiw-benefit">
            <h3>💰 Continuous Earning</h3>
            <p>Turn your unused items into a steady income stream.</p>
          </div>
          <div className="hiw-benefit">
            <h3>🔒 Safety First</h3>
            <p>Secure payments, verified users, and deposit protection.</p>
          </div>
          <div className="hiw-benefit">
            <h3>📦 Hassle-Free Returns</h3>
            <p>QR verification ensures items are always returned properly.</p>
          </div>
          <div className="hiw-benefit">
            <h3>🌍 Eco-Friendly Sharing</h3>
            <p>Reduce waste by sharing and reusing what’s already available.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hiw-cta">
        <h2>Ready to Start Earning?</h2>
        <p>
          Join RentSafe today and experience a smarter, safer, and greener way
          to share your world.
        </p>
        <button
          className="hiw-btn"
          onClick={() => (window.location.href = "/signup")}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HowItWorks;








