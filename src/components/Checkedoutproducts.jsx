import { useCartContext } from "../components/cartContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    cartlist,
    isLoading,
    isError,
    cartItems,
    finalCheckOutPrice,
    addresses,
    selectAddress,
    selectedAddress,
    addAddress,
    placeOrder,
    orderPlaced,
    setOrderPlaced,
  } = useCartContext();

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Loading cart items...</h4>
      </div>
    );
  }

  if (isError) {
    return <p className="text-danger">Something went wrong</p>;
  }

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => {
        setOrderPlaced(false);
        navigate("/profile");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate, setOrderPlaced]);

  if (cartlist.length === 0) return <h3>Your cart is empty ❤️</h3>;

  console.log("Cart items -- ", cartItems);

  return (
    <>
      <h2 className="pt-3">Check Out Your Order(s)</h2>
      <div className="mt-4 card">
        <div className="m-4">
          {/* order summary */}
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.cartId}>
              <div className="pt-2 d-flex justify-content-between">
                <p className="fs-4">
                  {item.smallHeader} ({item.variant.color}, {item.variant.ram},{" "}
                  {item.variant.storage})
                </p>
                <h3>Total: ₹{finalCheckOutPrice}</h3>
              </div>
            </div>
          ))}
          <hr />

          {/* Delivery summary */}
          <h2>Delivery Summary</h2>

          {addresses.length === 0 && (
            <p className="text-muted mt-2">
              No saved addresses. Please add one to continue.
            </p>
          )}

          <div className="pt-3">
            {addresses.map((addr, index) => (
              <div
                key={addr.id}
                className={`card p-3 mb-2 ${
                  selectedAddress?.id === addr.id ? "border-primary" : ""
                }`}
              >
                <label className="d-flex gap-3 align-items-start">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    checked={selectedAddress?.id === addr.id}
                    onChange={() => selectAddress(addr.id)}
                  />

                  <div>
                    <p className="fw-bold mb-1">
                      Address {index + 1} — {addr.name}
                    </p>
                    <p className="mb-1">{addr.address}</p>
                    <p className="mb-0">
                      📞 {addr.phone} | 📍 {addr.pincode}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              className="btn btn-outline-primary mt-3"
              onClick={() => setShowForm(!showForm)}
            >
              + Add New Address
            </button>

            {showForm && (
              <div className="card p-3 mt-3">
                <input
                  placeholder="Name"
                  className="form-control mb-2"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  placeholder="Phone"
                  className="form-control mb-2"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <input
                  placeholder="Address"
                  className="form-control mb-2"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="Pincode"
                  className="form-control mb-2"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pincode: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-success"
                  onClick={() => {
                    addAddress(formData);
                    setFormData({
                      name: "",
                      phone: "",
                      address: "",
                      pincode: "",
                    });
                    setShowForm(false);
                  }}
                >
                  Save Address
                </button>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-warning px-5 py-2"
              disabled={!selectedAddress}
              onClick={placeOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
