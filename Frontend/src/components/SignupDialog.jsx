// src/components/SignupDialog.jsx
import React, { useState } from "react";
import "./SignupDialog.css";

export default function SignupDialog({ open, onClose, setUser, setJustLoggedIn }) {
  if (!open) return null;

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    age: "",
    house: "",
    street: "",
    locality: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    aadhar: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const validate = () => {
    if (!form.name || !form.mobile || !form.email || !form.password)
      return "Please fill name, mobile, email and password.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    if (form.password.length < 6) return "Password must be 6+ characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        gender: form.gender,
        age: form.age,
        address: {
          house: form.house,
          street: form.street,
          locality: form.locality,
          landmark: form.landmark,
          pincode: form.pincode,
          city: form.city,
          state: form.state,
          country: form.country,
        },
        aadhar: form.aadhar,
        password: form.password,
      };

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Register error:", data);
        alert(data.message || "Registration failed");
      } 
      else {
        localStorage.setItem("rentsafe_user", JSON.stringify(data.user));
        setUser(data.user);
        setJustLoggedIn(true);
        onClose();
        alert("Registration successful");
      }

        // alert("Registration successful!");
        // onClose(); // close dialog
      
    } catch (e) {
      console.error(e);
      alert("Failed to register. See console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-overlay" role="dialog" aria-modal="true">
      <div className="signup-dialog">
        <button className="signup-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className="signup-title">Create an account</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-row">
            <input placeholder="Full name" value={form.name} onChange={update("name")} />
            <input placeholder="Mobile number" value={form.mobile} onChange={update("mobile")} />
          </div>

          <div className="signup-row">
            <input placeholder="Email" value={form.email} onChange={update("email")} />
            <input placeholder="Gender" value={form.gender} onChange={update("gender")} />
          </div>

          <div className="signup-row">
            <input placeholder="Age" value={form.age} onChange={update("age")} />
            <input placeholder="Aadhar number" value={form.aadhar} onChange={update("aadhar")} />
          </div>

          <h4 className="signup-sub">Address</h4>
          <div className="signup-row-col">
            <input placeholder="House / Flat no" value={form.house} onChange={update("house")} />
            <input placeholder="Street name" value={form.street} onChange={update("street")} />
            <input placeholder="Locality" value={form.locality} onChange={update("locality")} />
            <input placeholder="Landmark" value={form.landmark} onChange={update("landmark")} />
            <input placeholder="Pincode" value={form.pincode} onChange={update("pincode")} />
            <input placeholder="City" value={form.city} onChange={update("city")} />
            <input placeholder="State" value={form.state} onChange={update("state")} />
            <input placeholder="Country" value={form.country} onChange={update("country")} />
          </div>

          <div className="signup-row">
            <input placeholder="Password" type="password" value={form.password} onChange={update("password")} />
            <input placeholder="Confirm Password" type="password" value={form.confirmPassword} onChange={update("confirmPassword")} />
          </div>

          <div className="signup-actions">
            <button type="submit" className="signup-primary" disabled={submitting}>
              {submitting ? "Creating…" : "Create account"}
            </button>
            <button type="button" className="signup-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
