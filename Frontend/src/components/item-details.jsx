import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./item-details.css";
import { useHistory } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const history = useHistory();
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <main className="id-root">
      <div className="id-card">
        <div className="id-media">
          <img
            src={`http://localhost:5000/uploads/${product.imageUrl}`}
            alt={product.productName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="id-body">
          <h1 className="id-title">{product.productName}</h1>
          <p className="id-desc">{product.description}</p>

          <div className="id-meta">
            <div>
              <strong>Price:</strong> ₹{product.priceRange}
            </div>
            <div>
              <strong>Minimum Rental:</strong> {product.minRentalPeriod} days
            </div>
          </div>

          <div className="id-actions">
            <button
              className="id-rent-btn"
              onClick={async () => {
                try {
                  await axios.post("http://localhost:5000/api/cart", {
                    userId: 1,
                    productId: product.id,
                  });

                  history.push("/cart");
                } catch (err) {
                  console.error(err);
                  alert("Failed to add to cart");
                }
              }}
            >
              Add to Cart
            </button>



            <Link to="/" className="id-back-link">← Back to home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}



// // src/components/item-detail.jsx
// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import "./item-details.css";

// export default function ItemDetail() {
//   const { id } = useParams();
//   const title = id ? id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Item";

//   // Create demo details (static for demo)
//   const description = `Detailed demo description for ${title}. This listing is part of RentSafe's demo data and shows how the product detail view will look. It includes condition, what’s included, pick-up instructions, and expected return procedure.`;

//   return (
//     <main className="id-root">
//       <div className="id-card">
//         <div className="id-media">📦</div>
//         <div className="id-body">
//           <h1 className="id-title">{title}</h1>
//           <p className="id-desc">{description}</p>

//           <div className="id-meta">
//             <div>
//               <strong>Price:</strong> $12 / day (demo)
//             </div>
//             <div>
//               <strong>Location:</strong> Near you (demo)
//             </div>
//           </div>

//           <div className="id-actions">
//             <button
//               className="id-rent-btn"
//               onClick={() => alert("Rent flow demo — connect to payments and booking logic.")}
//             >
//               Rent it
//             </button>

//             <Link to="/" className="id-back-link">← Back to home</Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
