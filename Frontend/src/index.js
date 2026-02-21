import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import api from "./api/axios";

import "./style.css";

import Home from "./views/home";
import NotFound from "./views/not-found";
import HowItWorks from "./components/how-it-works";
import BrowseItems from "./components/browse";
import SearchResults from "./components/SearchResults";
import ItemDetail from "./components/item-details";
import About from "./components/AboutUs";
import Contact from "./components/contact";
import Account from "./components/Account";
import Orders from "./components/Orders";
import YourProducts from "./components/YourProducts";
import Cart from "./components/Cart"; 
import Login from "./components/Login";
import SignupDialog from "./components/SignupDialog";

const App = () => {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  //  NEW: Global dialog state (single source of truth)
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  //  Session check
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);




  //  Switch from login → signup
  const openSignupFromLogin = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  if (checkingSession) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Switch>

          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                user={user}
                setUser={setUser}
                openLogin={() => setLoginOpen(true)}
                setSignupOpen={() => setSignupOpen(true)}
              />
            )}
          />

          <Route exact path="/how-it-works" component={HowItWorks} />
          <Route exact path="/browse-items" component={BrowseItems} />
          <Route exact path="/search" component={SearchResults} />
          <Route exact path="/item/:id" component={ItemDetail} />
          <Route exact path="/AboutUs" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/account" component={Account} />
          <Route path="/orders" component={Orders} />
          <Route path="/products" component={YourProducts} />
          <Route exact path="/not-found" component={NotFound} />
          <Route path="/cart" component={Cart} />
          <Route path="*" component={NotFound} />
          <Redirect to="/not-found" />

        </Switch>
      </Router>

      {/*  GLOBAL LOGIN */}
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUser={setUser}
        setJustLoggedIn={() => {}}
        openSignup={openSignupFromLogin}
      />

      {/* GLOBAL SIGNUP */}
      <SignupDialog
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        setUser={setUser}
      />
    </>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);


































