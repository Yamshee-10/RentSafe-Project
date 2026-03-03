
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
import PaymentDialog from "./PaymentDialog";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [paymentOpen, setPaymentOpen] = useState(false);
  // adding selectedmonths variable
  const [selectedMonths, setSelectedMonths] = useState({});
  const user = JSON.parse(localStorage.getItem("rentsafe_user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart/1")
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
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


    // const total = items.reduce((sum, item) => {
    //   if (!selectedItems[item.id]) return sum;
    //   const price = Number(item.Product?.priceRange || 0);
    //   return sum + price;
    // }, 0);
    const total = items.reduce((sum, item) => {
      if (!selectedItems[item.id]) return sum;

      const pricePerMonth = Number(item.Product?.priceRange || 0);
      const months = selectedMonths[item.id] || 1;

      return sum + (pricePerMonth * months);
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
                    {/* adding new snippet for dropdown from line no. 94-111 */}
                    <select
                      value={selectedMonths[item.id] || 1}
                      onChange={(e) =>
                        setSelectedMonths(prev => ({
                          ...prev,
                          [item.id]: Number(e.target.value)
                        }))
                      }
                    >
                      {Array.from(
                        { length: product?.minRentalPeriod || 1 },
                        (_, i) => i + 1
                      ).map(month => (
                        <option key={month} value={month}>
                          {month} month{month > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <span>Rent per month: ₹{product?.priceRange}</span>
                  </div>

                </div>

                <div className="cart-right">
                  <p className="cart-item-total">
                    ₹{Number(product?.priceRange || 0).toFixed(2)}

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

          {/* After connecting it with setPayemntOpen */}
          <button 
            className="cart-checkout-btn"
            onClick={() => setPaymentOpen(true)}
          >
            Proceed to Payment
          </button>

          {/* Before connecting it with setPayemntOpen */}
            {/* <button className="cart-checkout-btn">
              Proceed to Payment
            </button> */}
          </div>

          {/* <PaymentDialog
            open={paymentOpen}
            onClose={() => setPaymentOpen(false)}
            user={user}
            cartItems={items.filter(item => selectedItems[item.id])
            }
            totalCost={total}
          /> */}
          {/* modified payment props */}
          <PaymentDialog
            open={paymentOpen}
            onClose={() => setPaymentOpen(false)}
            user={user}
            cartItems={items
              .filter(item => selectedItems[item.id])
              .map(item => ({
                ...item,
                selectedMonths: selectedMonths[item.id] || 1
              }))
            }
            totalCost={total}
          />
        </>
      )}
    </main>
  );
}