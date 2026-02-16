import React from "react";
import Hero from "../components/hero";

export default function Home({ user, openLogin }) {
  return (
    <>
      <div style={{ padding: 20 }}>
        <h1>Home</h1>
        <p>Welcome to RentSafe.</p>
      </div>

      <Hero
        user={user}
        openLogin={openLogin}
      />
    </>
  );
}


