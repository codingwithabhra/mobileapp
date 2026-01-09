import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCartContext } from "../components/cartContext";

const Checkout = () => {
  const {
    cartlist,
    cartMap,
    cartItems,
    increaseQty,
    decreaseQty,
    finalCheckOutPrice,
    totalProductCount,
    totalSavings,
    removeFromCart,
    cartitems,
    addresses,
    selectedAddress,
    selectedAddressId,
    addAddress,
    selectAddress,
  } = useCartContext();

  if (cartlist.length === 0) return <h3>Your cart is empty ❤️</h3>;

  console.log("Cart items -- ", cartItems);

  return (
    <>
      <header>
        <Header />
      </header>

      <main style={{ backgroundColor: "#e6f0ff" }} className="pt-3 pb-4">
        <div className="container">
          <h2 className="pt-3">Check Out Your Order(s)</h2>
          <div className="mt-4 card">
            <div className="m-4">
              {/* order summary */}
              <h2>Order Summary</h2>

              {cartItems.map((item) => (
                <div key={item.cartId}>
                  <div className="pt-2 d-flex justify-content-between">
                    <p className="fs-4">
                      {item.smallHeader} ({item.variant.color},{" "}
                      {item.variant.ram}, {item.variant.storage})
                    </p>
                    <h3>Total: ₹{finalCheckOutPrice}</h3>
                  </div>
                </div>
              ))}
              <hr />

              {/* Delivery summary */}
              <h2>Delivery Summary</h2>
              <div className="pt-2">
                <div className="pt-2 d-flex justify-content-between">
                  <p className="fs-4 fw-regular">Name :</p>
                  <h4 className="fs-3">Abhra Patra</h4>
                </div>

                <div className="pt-2 d-flex justify-content-between">
                  <p className="fs-4 fw-semiBold">Phone :</p>
                  <h4 className="fs-4">9XXXXXXXXX</h4>
                </div>

                <div className="pt-2 d-flex justify-content-between">
                  <h2>Delivery Address</h2>

                  {/* {addresses.map((addr) => (
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
                          <p>{addr.address}</p>
                          <p>
                            {addr.phone} - {addr.pincode}
                          </p>
                        </div>
                      </label>
                    </div>
                  ))} */}
                </div>

                <div className="pt-2 d-flex justify-content-between">
                  <p className="fs-4 fw-semiBold">Pincode :</p>
                  <h4 className="fs-4">700001</h4>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-warning px-5 py-2">
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Checkout;
