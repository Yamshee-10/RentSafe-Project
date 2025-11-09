// src/components/SearchResults.jsx
// // src/components/SearchResults.jsx
// import React, { useMemo } from "react";
// import { useLocation, Link } from "react-router-dom";
// import "./search-results.css";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function SearchResults() {
//   const query = useQuery().get("q") || "";
//   const searchTerm = query.trim() || "Item";

//   // ✅ List of possible Unsplash categories for random variety
//   const categories = [
//     "camera",
//     "laptop",
//     "bicycle",
//     "tent",
//     "projector",
//     "chair",
//     "speaker",
//     "tools",
//     "car",
//     "drone",
//     "phone",
//     "furniture",
//     "kitchen",
//     "sports",
//     "watch",
//     "guitar",
//     "bag",
//     "fashion",
//     "electronics",
//     "appliance",
//   ];

//   // ✅ Function to get unique image URLs (Unsplash source always random)
//   const getImageUrl = (term, i) => {
//     const randomCategory = categories[i % categories.length];
//     // use both search term and index to ensure unique results
//     return `https://source.unsplash.com/400x300/?${encodeURIComponent(
//       term || randomCategory
//     )}&sig=${i}`;
//   };

//   // ✅ Generate 10 listings with guaranteed images
//   const listings = useMemo(() => {
//     return Array.from({ length: 10 }).map((_, i) => ({
//       id: `${searchTerm.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
//       title: `${searchTerm} — Model ${i + 1}`,
//       description: `High-quality ${searchTerm.toLowerCase()} for rent. Reliable, affordable, and available near you.`,
//       image: getImageUrl(searchTerm, i),
//     }));
//   }, [searchTerm]);

//   return (
//     <main className="sr-root">
//       <h1 className="sr-heading">Search results for “{searchTerm}”</h1>
//       <div className="sr-grid">
//         {listings.map((item) => (
//           <div className="sr-card" key={item.id}>
//             <img
//               src={item.image}
//               alt={item.title}
//               className="sr-img"
//               loading="lazy"
//             />
//             <h2 className="sr-title">{item.title}</h2>
//             <p className="sr-desc">{item.description}</p>
//             <Link
//               to={`/item/${encodeURIComponent(item.id)}`}
//               className="sr-rent-btn"
//               state={{ image: item.image }}
//             >
//               Rent it
//             </Link>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }













import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./search-results.css";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "Item";

  // Generate 10 demo listings for the searched item
  const demoListings = Array.from({ length: 10 }).map((_, index) => ({
    id: `${searchQuery.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
    title: `${searchQuery} ${index + 1}`,
    description: `This is a high-quality ${searchQuery.toLowerCase()} perfect for all your rental needs. It’s well-maintained and ready for use.`,
    price: `$${10 + index * 2} / day`,
    location: "Downtown Area (demo)",
  }));

  return (
    <main className="sr-root">
      <h2 className="sr-heading">Search results for “{searchQuery}”</h2>

      <div className="sr-grid">
        {demoListings.map((item) => (
          <div key={item.id} className="sr-card">
            <div className="sr-card-header">
              <h3 className="sr-title">{item.title}</h3>
            </div>
            <p className="sr-desc">{item.description}</p>
            <p className="sr-price">{item.price}</p>
            <p className="sr-location">{item.location}</p>
            <Link
              to={{
                pathname: `/item/${item.id}`,
                state: { item },
              }}
              className="sr-rent-btn"
            >
              Rent it
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}









// import React from "react";
// import { useLocation, useHistory } from "react-router-dom";
// import "./search-results.css";

// const DEMO_ITEMS = [
//   { name: "Drill", desc: "High-speed power drill for home and professional use." },
//   { name: "Camera", desc: "DSLR camera perfect for portraits and events." },
//   { name: "Tent", desc: "Waterproof camping tent for 4 people." },
//   { name: "Projector", desc: "Full HD portable projector with HDMI support." },
//   { name: "Bicycle", desc: "Sturdy mountain bike suitable for all terrains." },
//   { name: "Speaker", desc: "Bluetooth speaker with deep bass and long battery life." },
//   { name: "Lawn Mower", desc: "Electric lawn mower for easy garden maintenance." },
//   { name: "Blender", desc: "Multi-speed kitchen blender with glass jar." },
//   { name: "Tripod", desc: "Adjustable tripod for cameras and phones." },
//   { name: "GoPro", desc: "Action camera for capturing your adventures." },
// ];

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function SearchResults() {
//   const query = useQuery().get("query") || "";
//   const history = useHistory();

//   // Filter demo items (case-insensitive match)
//   const results = DEMO_ITEMS.filter((item) =>
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="search-results-container">
//       <h1 className="search-results-title">
//         Search results for “{query || "All Items"}”
//       </h1>

//       {results.length === 0 ? (
//         <p className="search-no-results">No items found for your search.</p>
//       ) : (
//         <div className="search-grid">
//           {results.map((item, index) => (
//             <div key={index} className="search-card">
//               <h3 className="search-item-name">{item.name}</h3>
//               <p className="search-item-desc">{item.desc}</p>
//               <button
//                 className="search-rent-btn"
//                 onClick={() => alert(`You chose to rent: ${item.name}`)}
//               >
//                 Rent it
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <button className="search-back-btn" onClick={() => history.push("/")}>
//         ← Back to Home
//       </button>
//     </div>
//   );
// }
