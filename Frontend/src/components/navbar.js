import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import "./navbar.css";
import SignupDialog from "./SignupDialog";
import Login from "./Login";
import { Link, useHistory } from "react-router-dom";
import api from "../api/axios";
const Navbar = (props) => {
  // const [signupOpen, setSignupOpen] = useState(false);
  // const [loginOpen, setLoginOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const history = useHistory(); //
  //  ONLY runs after login/signup
  useEffect(() => {
    if (props.user) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [props.user]);
   
  
 
//   const handleLogout = () => {
//   localStorage.removeItem("rentsafe_user");
//   localStorage.removeItem("rentsafe_token");
//   props.setUser(null);
//   setDropdownOpen(false);
// };
  const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    props.setUser(null);
  } catch (err) {
    console.error(" Logout failed",err);
  }
  
  setDropdownOpen(false);
};

  
  // const openSignupFromLogin = () => {
  //     setLoginOpen(false);
  //     setSignupOpen(true);
  // };


  return (
    <>
      <header className="navbar-container">
        <header data-thq="thq-navbar" className="navbar-navbar-interactive">
          <img
            alt={props.logoAlt}
            src={props.logoSrc}
            className="navbar-image1"
          />

          <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
            <nav className="navbar-links1">
              <Link to="/" className="thq-link thq-body-small">{props.link1}</Link>
              <Link to="/how-it-works" className="thq-link thq-body-small">{props.link2}</Link>
              <Link to="/browse-items" className="thq-link thq-body-small">{props.link3}</Link>
              <Link to="/AboutUs" className="thq-link thq-body-small">{props.link4}</Link>
              <Link to="/contact" className="thq-link thq-body-small">{props.link5}</Link>
            </nav>

            <div className="navbar-buttons1">
              {!props.user ? (
                <>
                  <button
                    onClick={() => props.setLoginOpen(true)}
                    className="navbar-action11 thq-button-filled thq-button-animated"
                  >
                    <span className="thq-body-small">Login</span>
                  </button>

                  <button
                    onClick={() => props.setSignupOpen(true)}
                    className="thq-button-outline"
                  >
                    Sign-Up
                  </button>
                </>
              ) : (
                <div className="user-menu">
                  <button
                    className="user-button thq-button-outline"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {props.user.name}
                  </button>

                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <Link to="/account" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        Your Account
                      </Link>
                      <button onClick={() => history.push("/orders")}>
                        Your Orders
                      </button>
                      <Link
                        to="/products"
                        className="dropdown-link"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Your Products
                      </Link>
                      <Link
                        to="/cart"
                        className="dropdown-link"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Your Cart
                      </Link>
                      <button className="dropdown-item logout" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      </header>

      
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-message">
            WELCOME {props.user?.name.toUpperCase()}
          </div>
        </div>
      )}

      {/* <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUser={setUser}
        setJustLoggedIn={setJustLoggedIn}
      /> */}
      {/* <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUser={setUser}
        setJustLoggedIn={setJustLoggedIn}
        openSignup={openSignupFromLogin}
      />


      <SignupDialog
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        setUser={setUser}
      /> */}
    </>
  );
};
Navbar.defaultProps = {
  link1: "Home",
  link2: "How It Works",
  link3: "Browse Items",
  link4: "About Us",
  link5: "Contact Us",
  logoAlt: "RentSafe Logo",
  logoSrc:
    "https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original",
};

Navbar.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  link1: PropTypes.string,
  link2: PropTypes.string,
  link3: PropTypes.string,
  link4: PropTypes.string,
  link5: PropTypes.string,
};


export default Navbar;
















