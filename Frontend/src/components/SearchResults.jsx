import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./search-results.css";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // supports both ?q= and ?query=
  const searchQuery =
    (params.get("q") || params.get("query") || "").toLowerCase();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery)
  );

  if (loading) return <h2 className="sr-heading">Loading results...</h2>;

  return (
    <main className="sr-root">
      <h2 className="sr-heading">Search results for “{searchQuery}”</h2>

      {filteredProducts.length === 0 ? (
        <p className="sr-heading">No matching items found.</p>
      ) : (
        <div className="sr-grid">
          {filteredProducts.map((item) => (
            <div key={item.id} className="sr-card">
              <div className="sr-card-media">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.productName}
                  className="sr-image"
                />
              </div>

              <h3 className="sr-title">{item.productName}</h3>
              <p className="sr-desc">{item.description}</p>
              <p className="sr-price">₹{item.priceRange} / month</p>
              <p className="sr-location">Min rental: {item.minRentalPeriod} month</p>

              <Link
                to={`/item/${item.id}`}
                className="sr-rent-btn"
              >
                Rent it
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}





// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import "./search-results.css";

// export default function SearchResults() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = (queryParams.get("q") || queryParams.get("query") || "").toLowerCase();

//   // const searchQuery = queryParams.get("q")?.toLowerCase() || "";

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   // Fetch products from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);

//         // Filter items based on search query
//         const results = data.filter((item) =>
//           item.name.toLowerCase().includes(searchQuery)
//         );
//         setFiltered(results);
//       })
//       .catch((err) => console.error("Error loading products:", err));
//   }, [searchQuery]);

//   return (
//     <main className="sr-root">
//       <h2 className="sr-heading">
//         Search results for “{searchQuery || "All Items"}”
//       </h2>

//       <div className="sr-grid">
//         {filtered.length === 0 ? (
//           <p>No matching items found.</p>
//         ) : (
//           filtered.map((item) => (
//             <div key={item.id} className="sr-card">
//               {/* Image Section */}
//               <div className="sr-card-media">
//                 <img
//                   src={item.imageUrl || "https://via.placeholder.com/200"}
//                   alt={item.name}
//                   className="sr-image"
//                 />
//               </div>

//               {/* Text Section */}
//               <h3 className="sr-title">{item.name}</h3>
//               <p className="sr-desc">{item.description}</p>
//               <p className="sr-price">₹{item.price}</p>
//               <p className="sr-location">{item.location || "Unknown location"}</p>

//               {/* Details Page Link */}
//               <Link
//                 to={`/item/${item.id}`}
//                 state={{ item }}
//                 className="sr-rent-btn"
//               >
//                 Rent it
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </main>
//   );
// }














// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import "./search-results.css";

// export default function SearchResults() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("q") || "Item";

//   // Generate 10 demo listings for the searched item
//   const demoListings = Array.from({ length: 10 }).map((_, index) => ({
//     id: `${searchQuery.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`,
//     title: `${searchQuery} ${index + 1}`,
//     description: `This is a high-quality ${searchQuery.toLowerCase()} perfect for all your rental needs. It’s well-maintained and ready for use.`,
//     price: `$${10 + index * 2} / day`,
//     location: "Downtown Area (demo)",
//   }));

//   return (
//     <main className="sr-root">
//       <h2 className="sr-heading">Search results for “{searchQuery}”</h2>

//       <div className="sr-grid">
//         {demoListings.map((item) => (
//           <div key={item.id} className="sr-card">
//             <div className="sr-card-header">
//               <h3 className="sr-title">{item.title}</h3>
//             </div>
//             <p className="sr-desc">{item.description}</p>
//             <p className="sr-price">{item.price}</p>
//             <p className="sr-location">{item.location}</p>
//             <Link
//               to={{
//                 pathname: `/item/${item.id}`,
//                 state: { item },
//               }}
//               className="sr-rent-btn"
//             >
//               Rent it
//             </Link>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }









