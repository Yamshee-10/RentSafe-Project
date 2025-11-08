// src/components/browse.jsx

import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Home from "../views/home"; // show the homepage as a background
import "./browse.css";

const SAMPLE_ITEMS = [
  "Drill",
  "Power Drill",
  "Cordless Drill",
  "Blender",
  "Carpet Cleaner",
  "Bicycle",
  "Mountain Bike",
  "Kayak",
  "Camera",
  "DSLR Camera",
  "Mirrorless Camera",
  "Lens 50mm",
  "Projector",
  "Speaker",
  "Tent",
  "Camping Stove",
  "Lawn Mower",
  "Electric Screwdriver",
  "Tripod",
  "GoPro",
  "Snowboard",
  "Treadmill",
  "Baby Stroller",
];

export default function Browse() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const history = useHistory();


  useEffect(() => {
    // filter suggestions as user types
    if (!query || query.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = SAMPLE_ITEMS.filter((s) =>
      s.toLowerCase().includes(q)
    ).slice(0, 8); // limit to 8 suggestions
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query]);

  // click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (text) => {
    setQuery(text);
    setShowSuggestions(false);
    // keep focus on input so user can continue editing
    if (inputRef.current) inputRef.current.focus();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="browse-root">
      {/* background: render Home so user sees the homepage behind the overlay */}
      <div className="browse-background">
        <Home />
      </div>

      {/* overlay */}
      <div className="browse-overlay">
        <div className="browse-panel" role="dialog" aria-modal="true">
          <h2 className="browse-title">Search items to rent</h2>

          <div className="browse-search-wrap">
            <input
              ref={inputRef}
              className="browse-search-input"
              placeholder="Search items (e.g. Camera, Drill, Bike)..."
              value={query}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              aria-label="Search items"
            />
            {query && (
              <button className="browse-clear-btn" onClick={handleClear} aria-label="Clear search">✕</button>
            )}
          </div>

          <div ref={listRef} className="browse-suggestions">
            {showSuggestions ? (
              <ul>
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="browse-suggestion-item"
                    onClick={() => handleSelect(s)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSelect(s);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="browse-empty">
                <p className="browse-empty-text">
                  {query ? "No suggestions — try different words." : "Start typing to see suggestions."}
                </p>
              </div>
            )}
          </div>

          <div className="browse-actions">
            <button
                className="browse-search-btn"
                onClick={() => {
                const q = (query || "").trim();
                    if (!q) {
                    // small UX: focus input if empty
                        if (inputRef.current) inputRef.current.focus();
                         return;
                    }
                // close overlay then navigate to results
                    if (typeof onClose === "function") onClose();
                    history.push(`/search?query=${encodeURIComponent(q)}`);
                }}
            type="button"
            >
            Search
            </button>


            {/* <button
              className="browse-search-btn"
              onClick={() => {
                // temporary action: for now we just console.log; later you can route to results page
                console.log("Search clicked for:", query);
                alert(`Searching for: "${query}" (demo)`);
              }}
            >
              Search
            </button> */}
            <button
              className="browse-close-btn"
              onClick={() => {
                // go back to home route
                window.location.href = "/";
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}








