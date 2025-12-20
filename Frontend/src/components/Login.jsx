// import React from 'react';

// export default function Login() {
//   return <div style={{ padding: 20 }}><h1>Login</h1></div>;
// }
import React, { useState } from "react";
import "./Login.css";

export default function Login({ open, onClose }) {
  if (!open) return null;

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
      } else {
        // Store user session
        localStorage.setItem("rentsafe_user", JSON.stringify(data.user));
        alert("Login successful!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-dialog">
        <button className="login-close" onClick={onClose}>×</button>
        <h2 className="login-title">Login to RentSafe</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email or Mobile number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
