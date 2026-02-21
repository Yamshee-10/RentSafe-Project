
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  // const [months, setMonths] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart/1")
      .then((res) => {
        console.log(res.data);
        setItems(res.data);

        // default 1 month for each item
        // const initialMonths = {};
        // res.data.forEach((item) => {
        //   initialMonths[item.id] = 1;
        // });
        // setMonths(initialMonths);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRemove = async (cartId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${cartId}`);

      // Refresh cart after delete
      setItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };



  // const handleMonthChange = (id, value) => {
  //   setMonths((prev) => ({
  //     ...prev,
  //     [id]: Number(value),
  //   }));
  // };

  // const total = items.reduce((sum, item) => {
  //   const price = Number(item.Product?.priceRange || 0);
  //   const selectedMonths = months[item.id] || 1;
  //   return sum + price * selectedMonths;
  // }, 0);
    const total = items.reduce((sum, item) => {
      if (!selectedItems[item.id]) return sum;
      const price = Number(item.Product?.priceRange || 0);
      return sum + price;
    }, 0);



  return (
    <main className="cart-root">
      <h2 className="cart-title">Your Cart</h2>

      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => {
            const product = item.Product;

            return (
              <div key={item.id} className="cart-card">
                <div className="cart-left">
                <input
                  type="checkbox"
                  checked={selectedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                />

                <img
                  src={`http://localhost:5000/uploads/${product?.imageUrl}`}
                  alt={product?.productName}
                  className="cart-image"
                />

                </div>

                <div className="cart-middle">
                  <h3 className="cart-product-name">
                    {product?.productName}
                  </h3>

                  <p className="cart-description">
                    {product?.description}
                  </p>

                  <div className="cart-meta">
                    <span>
                      Rental Period: {product?.minRentalPeriod} month(s) min
                    </span>
                    <span>Rent per month: ₹{product?.priceRange}</span>
                  </div>

                  {/* <div className="cart-month-select">
                    <label>Months:</label>
                    <select
                      value={months[item.id] || 1}
                      onChange={(e) =>
                        handleMonthChange(item.id, e.target.value)
                      }
                    >
                      {[1, 2, 3, 4, 5, 6, 12].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>

                <div className="cart-right">
                  <p className="cart-item-total">
                    ₹{Number(product?.priceRange || 0).toFixed(2)}

                    {/* ₹
                    {(
                      Number(product?.priceRange || 0) *
                      (months[item.id] || 1)
                    ).toFixed(2)} */}
                  </p>

                  <button
                    className="cart-remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>

                </div>
              </div>
            );
          })}

          <div className="cart-summary">
            <div className="cart-total">
              Total: ₹{total.toFixed(2)}
            </div>

            <button className="cart-checkout-btn">
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </main>
  );
}

