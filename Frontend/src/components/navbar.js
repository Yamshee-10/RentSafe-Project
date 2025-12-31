// // src/components/navbar.jsx


import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./navbar.css";
import SignupDialog from "./SignupDialog";
import Login from "./Login";

const Navbar = (props) => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showWelcome, setShowWelcome] = useState(false);

  // 🔥 ONLY runs after login/signup
  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("rentsafe_user");
    setUser(null);
    setDropdownOpen(false);
  };

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
              {!user ? (
                <>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="navbar-action11 thq-button-filled thq-button-animated"
                  >
                    <span className="thq-body-small">Login</span>
                  </button>

                  <button
                    onClick={() => setSignupOpen(true)}
                    className="thq-button-outline"
                  >
                    Sign-Up
                  </button>
                </>
              ) : (
                <div className="user-menu">
                  <button
                    className="user-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {user.name}
                  </button>

                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <button>Your Account</button>
                      <button>Your Orders</button>
                      <button>Settings</button>
                      <button>Your Products</button>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      </header>

      {/* 🔥 BIG WELCOME */}
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-message">
            WELCOME {user?.name.toUpperCase()}
          </div>
        </div>
      )}

      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUser={setUser}
      />

      <SignupDialog
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        setUser={setUser}
      />
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





// src/components/navbar.js
// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { Link, useHistory } from "react-router-dom";
// import "./navbar.css";
// import SignupDialog from "./SignupDialog";
// import Login from "./Login";

// const Navbar = (props) => {
//   const [signupOpen, setSignupOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // 🔥 controls welcome overlay ONLY after login/signup
//   const [justLoggedIn, setJustLoggedIn] = useState(false);
//   const [showWelcome, setShowWelcome] = useState(false);

//   const history = useHistory();

//   // ✅ Load user on refresh WITHOUT showing welcome
//   useEffect(() => {
//     const savedUser = localStorage.getItem("rentsafe_user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   // ✅ Show welcome ONLY when user logs in/signs up
//   useEffect(() => {
//     if (justLoggedIn) {
//       setShowWelcome(true);
//       const timer = setTimeout(() => {
//         setShowWelcome(false);
//         setJustLoggedIn(false);
//       }, 4000);

//       return () => clearTimeout(timer);
//     }
//   }, [justLoggedIn]);

//   const handleLogout = () => {
//     localStorage.removeItem("rentsafe_user");
//     setUser(null);
//     setDropdownOpen(false);
//     history.push("/");
//   };

//   return (
//     <>
//       <header className="navbar-container">
//         <header data-thq="thq-navbar" className="navbar-navbar-interactive">
//           <img
//             alt={props.logoAlt}
//             src={props.logoSrc}
//             className="navbar-image1"
//           />

//           <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
//             <nav className="navbar-links1">
//               <Link to="/" className="thq-link thq-body-small">{props.link1}</Link>
//               <Link to="/how-it-works" className="thq-link thq-body-small">{props.link2}</Link>
//               <Link to="/browse-items" className="thq-link thq-body-small">{props.link3}</Link>
//               <Link to="/AboutUs" className="thq-link thq-body-small">{props.link4}</Link>
//               <Link to="/contact" className="thq-link thq-body-small">{props.link5}</Link>
//             </nav>

//             <div className="navbar-buttons1">
//               {!user ? (
//                 <>
//                   <button
//                     onClick={() => setLoginOpen(true)}
//                     className="navbar-action11 thq-button-filled thq-button-animated"
//                   >
//                     <span className="thq-body-small">Login</span>
//                   </button>

//                   <button
//                     onClick={() => setSignupOpen(true)}
//                     className="thq-button-outline"
//                   >
//                     Sign-Up
//                   </button>
//                 </>
//               ) : (
//                 <div className="user-menu">
//                   <button
//                     className="user-button"
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                   >
//                     {user.name}
//                   </button>

//                   {dropdownOpen && (
//                     <div className="user-dropdown">
//                       <Link to="/account">Your Account</Link>
//                       <Link to="/orders">Your Orders</Link>
//                       <Link to="/settings">Settings</Link>
//                       <Link to="/products">Your Products</Link>
//                       <button onClick={handleLogout}>Logout</button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>
//       </header>

//       {/* 🔥 BIG WELCOME OVERLAY */}
//       {showWelcome && (
//         <div className="welcome-overlay">
//           <div className="welcome-message">
//             WELCOME {user?.name.toUpperCase()}
//           </div>
//         </div>
//       )}

//       <SignupDialog
//         open={signupOpen}
//         onClose={() => setSignupOpen(false)}
//         setUser={setUser}
//         setJustLoggedIn={setJustLoggedIn}
//       />

//       <Login
//         open={loginOpen}
//         onClose={() => setLoginOpen(false)}
//         setUser={setUser}
//         setJustLoggedIn={setJustLoggedIn}
//       />
//     </>
//   );
// };

// Navbar.defaultProps = {
//   link1: "Home",
//   link2: "How It Works",
//   link3: "Browse Items",
//   link4: "About Us",
//   link5: "Contact Us",
//   logoAlt: "RentSafe Logo",
//   logoSrc:
//     "https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original",
// };

// Navbar.propTypes = {
//   logoAlt: PropTypes.string,
//   logoSrc: PropTypes.string,
//   link1: PropTypes.string,
//   link2: PropTypes.string,
//   link3: PropTypes.string,
//   link4: PropTypes.string,
//   link5: PropTypes.string,
// };

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { Link, useHistory } from "react-router-dom";
// import SignupDialog from "./SignupDialog";
// import Login from "./Login";
// import "./navbar.css";

// const Navbar = (props) => {
//   const [signupOpen, setSignupOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const history = useHistory();

//   // Check for logged-in user on page load
//   useEffect(() => {
//   const savedUser = localStorage.getItem("rentsafe_user");
//   if (savedUser) {
//     // Only set the user state, do NOT show welcome automatically
//     setUser(JSON.parse(savedUser));
//     // Remove showWelcome here so it doesn't pop automatically
//   }
// }, []);


//   const [justLoggedIn, setJustLoggedIn] = useState(false);

//     useEffect(() => {
//       if (justLoggedIn) {
//         setShowWelcome(true);
//         const timer = setTimeout(() => {
//           setShowWelcome(false);
//           setJustLoggedIn(false);
//         }, 4000);
//         return () => clearTimeout(timer);
//       }
//     }, [justLoggedIn]);


//   // useEffect(() => {
//   //   const savedUser = localStorage.getItem("rentsafe_user");
//   //   if (savedUser) {
//   //     setUser(JSON.parse(savedUser));
//   //     setShowWelcome(true);
//   //     setTimeout(() => setShowWelcome(false), 4000); // fades after 4 seconds
//   //   }
//   // }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("rentsafe_user");
//     setUser(null);
//     setDropdownOpen(false);
//     history.push("/"); // redirect to home
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <header className="navbar-container">
//         <header data-thq="thq-navbar" className="navbar-navbar-interactive">
//           <img
//             alt={props.logoAlt}
//             src={props.logoSrc}
//             className="navbar-image1"
//           />

//           <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
//             <nav className="navbar-links1">
//               <Link to="/" className="thq-link thq-body-small">{props.link1}</Link>
//               <Link to="/how-it-works" className="thq-link thq-body-small">{props.link2}</Link>
//               <Link to="/browse-items" className="thq-link thq-body-small">{props.link3}</Link>
//               <Link to="/AboutUs" className="thq-link thq-body-small">{props.link4}</Link>
//               <Link to="/contact" className="thq-link thq-body-small">{props.link5}</Link>
//             </nav>

//             <div className="navbar-buttons1">
//               {user ? (
//                 <div className="user-menu">
//                   <button
//                     className="user-button"
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                   >
//                     {user.name}
//                   </button>
//                   {dropdownOpen && (
//                     <div className="user-dropdown">
//                       <Link to="/account">Your Account</Link>
//                       <Link to="/orders">Your Orders</Link>
//                       <Link to="/settings">Settings</Link>
//                       <Link to="/products">Your Products</Link>
//                       <button onClick={handleLogout}>Logout</button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => setLoginOpen(true)}
//                     className="navbar-action11 thq-button-filled thq-button-animated"
//                   >
//                     <span className="thq-body-small">Login</span>
//                   </button>
//                   <button
//                     onClick={() => setSignupOpen(true)}
//                     className="thq-button-outline"
//                   >
//                     Sign-Up
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </header>
//       </header>

//       {/* Welcome Overlay */}
//       {showWelcome && (
//         <div className="welcome-overlay">
//           <div className="welcome-message">
//             WELCOME, {user?.name.toUpperCase()}!
//           </div>
//         </div>
//       )}

//       {/* Dialogs */}
//       <SignupDialog open={signupOpen} onClose={() => setSignupOpen(false)} setUser={setUser} />
//       <Login open={loginOpen} onClose={() => setLoginOpen(false)} setUser={setUser} />
//     </>
//   );
// };

// Navbar.defaultProps = {
//   link1: "Home",
//   link2: "How It Works",
//   link3: "Browse Items",
//   link4: "About Us",
//   link5: "Contact Us",
//   logoAlt: "RentSafe Logo",
//   logoSrc:
//     "https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original",
// };

// Navbar.propTypes = {
//   logoAlt: PropTypes.string,
//   logoSrc: PropTypes.string,
//   link1: PropTypes.string,
//   link2: PropTypes.string,
//   link3: PropTypes.string,
//   link4: PropTypes.string,
//   link5: PropTypes.string,
// };

// export default Navbar;














// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import "./navbar.css";
// import { Link } from "react-router-dom";
// import SignupDialog from "./SignupDialog";
// import Login from "./Login";
// // import { useState, useEffect } from "react";
// // import LoginDialog from "./LoginDialog";


// const Navbar = (props) => {
//   const [signupOpen, setSignupOpen] = useState(false);
//   const [loginOpen, setLoginOpen] = useState(false);
// //   const [showLogin, setShowLogin] = useState(false);
// //   const [user, setUser] = useState(null);
// //   useEffect(() => {
// //   const savedUser = localStorage.getItem("rentsafe_user");
// //   if (savedUser) {
// //     setUser(JSON.parse(savedUser));
// //   }
// // }, []);

//   return (
//     <>
//       <header className="navbar-container">
//         <header data-thq="thq-navbar" className="navbar-navbar-interactive">
//           <img
//             alt={props.logoAlt}
//             src={props.logoSrc}
//             className="navbar-image1"
//           />

//           <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
//             <nav className="navbar-links1">
//               <Link to="/" className="thq-link thq-body-small">
//                 {props.link1}
//               </Link>

//               <Link to="/how-it-works" className="thq-link thq-body-small">
//                 {props.link2}
//               </Link>

//               <Link to="/browse-items" className="thq-link thq-body-small">
//                 {props.link3}
//               </Link>

//               <Link to="/AboutUs" className="thq-link thq-body-small">
//                 {props.link4}
//               </Link>

//               <Link to="/contact" className="thq-link thq-body-small">
//                 {props.link5}
//               </Link>
//             </nav>

//             <div className="navbar-buttons1">
//               <button
//                  onClick={() => setLoginOpen(true)}
//                  className="navbar-action11 thq-button-filled thq-button-animated"
//               >
//               <span className="thq-body-small">Login</span>
//               </button>

//               {/* <button
//                 onClick={() => setLoginOpen(true)}
//                 className="navbar-action11 thq-button-filled thq-button-animated"
//               >
//                 <span className="thq-body-small">Login</span>
//               </button> */}



//               {/* <button className="navbar-action11 thq-button-filled thq-button-animated">
//                 <span className="thq-body-small">Login</span>
//               </button> */}

//               {/* 🔥 Signup Button */}
//               <button
//                 onClick={() => setSignupOpen(true)}
//                 className="thq-button-outline"
//               >
//                 Sign-Up
//               </button>
//             </div>
//           </div>
//         </header>
//       </header>

//       {/* ✅ Always include the dialog */}
//       <SignupDialog open={signupOpen} onClose={() => setSignupOpen(false)} />
//       <Login open={loginOpen} onClose={() => setLoginOpen(false)} />

//     </>
//   );
// };

// Navbar.defaultProps = {
//   link1: "Home",
//   link2: "How It Works",
//   link3: "Browse Items",
//   link4: "About Us",
//   link5: "Contact Us",
//   logoAlt: "RentSafe Logo",
//   logoSrc:
//     "https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original",
// };

// Navbar.propTypes = {
//   logoAlt: PropTypes.string,
//   logoSrc: PropTypes.string,
//   link1: PropTypes.string,
//   link2: PropTypes.string,
//   link3: PropTypes.string,
//   link4: PropTypes.string,
//   link5: PropTypes.string,
// };

// export default Navbar;











