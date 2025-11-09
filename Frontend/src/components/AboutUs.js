// src/components/about.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function AboutUs() {
  return (
    <main className="about-root">
      <header className="about-hero">
        <div className="about-hero-inner">
          <h1 className="about-title">Our Story — Why RentSafe Exists</h1>
          <p className="about-sub">
            RentSafe started from a simple idea: make everyday life more affordable,
            sustainable and community-driven by enabling people to safely lend and borrow
            the things they already own.
          </p>
          <Link to="/" className="about-cta">
            Back to Home
          </Link>
        </div>
      </header>

      <section className="about-section">
        <h2>From Idea to Reality</h2>
        <p>
          The idea for RentSafe came from watching neighbors ask to borrow tools,
          cameras and other items — and often saying "I could lend that, but it's
          complicated or unsafe." We sketched a simple flow: verified identities,
          a secure deposit system, and an easy booking interface. That sketch became
          a prototype, and the prototype grew into a small pilot. We iterated quickly
          based on real user feedback — making the flow simpler, adding QR-based
          return verification, and improving deposit handling.
        </p>

        <h3>Prototype → Pilot → Platform</h3>
        <p>
          We started with a small local pilot: 30 households, 120 items shared, and
          a handful of lessons learned. The pilot taught us two things: people want
          to share when it’s easy and fair; and owners only lend if they feel protected.
          RentSafe focused on addressing those requirements.
        </p>
      </section>

      <section className="about-section about-theme">
        <h2>Our Impact — Social & Environmental</h2>
        <p>
          RentSafe is designed to solve real problems:
        </p>
        <ul>
          <li><strong>Reduce waste:</strong> fewer purchases means fewer products discarded.</li>
          <li><strong>Make ownership affordable:</strong> users can access high-quality goods without the full purchase price.</li>
          <li><strong>Strengthen communities:</strong> neighbours help one another and build trust through transparent processes.</li>
          <li><strong>Lower resource strain:</strong> sharing reduces manufacturing demand and energy use over time.</li>
        </ul>

        <h3>Case in point</h3>
        <p>
          A single high-end camera used by 4 people over a month replaces 4 individual
          purchases. That means lower material consumption and more value delivered
          from the same product — a practical step toward sustainability.
        </p>
      </section>

      <section className="about-section">
        <h2>How We Keep Sharing Safe</h2>
        <p>
          Safety is core to RentSafe. We combine identity checks, deposits and
          clear return flows so owners feel protected and renters feel trusted.
        </p>

        <h4>Key safeguards</h4>
        <ol>
          <li><strong>Verification:</strong> owners and renters are verified during sign-up.</li>
          <li><strong>Security deposit:</strong> held securely and released only after verified return.</li>
          <li><strong>QR return checks:</strong> quick, tamper-resistant confirmation of returns.</li>
          <li><strong>Automated reminders:</strong> timely notifications before and after due dates.</li>
        </ol>
      </section>

      <section className="about-section about-values">
        <h2>Our Values</h2>
        <p>
          RentSafe is guided by three practical values:
        </p>
        <ul>
          <li><strong>Fairness:</strong> transparent fees, clear damage policies, and easy dispute paths.</li>
          <li><strong>Trust:</strong> verifiable actions and open communication tools between lender and renter.</li>
          <li><strong>Simplicity:</strong> a small number of steps to list, rent, and return items.</li>
        </ul>
      </section>

      <section className="about-section about-final">
        <h2>What’s Next</h2>
        <p>
          We’re expanding features: better search and discovery, location-based suggestions,
          insurance options, and long-term partner programs for small businesses. Our mission
          stays the same — create accessible, sustainable access to the tools and goods people need.
        </p>

        <p className="about-invite">
          Want to try RentSafe, list an item, or partner with us? Start at the home page and
          explore — and please tell us your story. We build this with our users.
        </p>

        <div className="about-end-cta">
          <Link to="/" className="about-primary-btn">Return to Home</Link>
        </div>
      </section>

      <footer className="about-footer">
        <small>© {new Date().getFullYear()} RentSafe — Built for community, designed for sustainability.</small>
      </footer>
    </main>
  );
}

export default AboutUs