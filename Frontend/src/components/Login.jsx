import React, { useState } from "react";
import "./Login.css";
import api from "../api/axios";

export default function Login({ open, onClose, setUser, setJustLoggedIn, openSignup }) {
  if (!open) return null;

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        identifier,
        password,
      });

      const data = res.data;
       localStorage.setItem("rentsafe_user", JSON.stringify(data.user));

   
      if (data.token) {
        localStorage.setItem("rentsafe_token", data.token);
      }
      setUser(data.user);        // Navbar sees logged-in user
      setJustLoggedIn(true);     // trigger welcome toast
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
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
        <div className="login-footer-text">
          Don't have an account?{" "}
          <span
            className="login-signup-link"
            onClick={openSignup}
          >
            Create one!
          </span>
        </div>

      </div>
    </div>
  );
}


