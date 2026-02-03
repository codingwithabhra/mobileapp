import { useCartContext } from "../components/cartContext";
import { useEffect } from "react";
import { useState } from "react";

const Checkout = () => {
  const {
    cartlist,
    isLoading,
    isError,
    cartMap,
    cartItems,
    increaseQty,
    decreaseQty,
    finalCheckOutPrice,
    totalProductCount,
    totalSavings,
    removeFromCart,
    addresses,
    selectedAddress,
    selectedAddressId,
    addAddress,
    selectAddress,
    placeOrder,
    orderPlaced,
    setOrderPlaced,
  } = useCartContext();

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
        window.location.replace("/");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

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
          <div className="pt-3">
            <div className="pt-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`card p-3 mb-2 ${
                    selectedAddress?.id === addr.id ? "border-primary" : ""
                  }`}
                >
                  <label className="d-flex gap-3 align-items-start">
                    <input
                      type="radio"
                      checked={selectedAddress?.id === addr.id}
                      onChange={() => selectAddress(addr.id)}
                    />
                    <div>
                      <p className="fw-bold">{addr.name}</p>
                      <p>Address - {addr.address}</p>
                      <p>
                        Mob - {addr.phone} / Pin - {addr.pincode}
                      </p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
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
                    setShowForm(false);
                  }}
                >
                  Save Address
                </button>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-warning px-5 py-2" onClick={placeOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
