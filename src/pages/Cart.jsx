import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../components/useFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../components/cartContext";

const Cart = () => {
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
  } = useCartContext();

  if (cartlist.length === 0) return <h3>Your cart is empty</h3>;

  console.log("Cart items -- ", cartItems);

  return (
    <>
      <header>
        <Header />
      </header>

      <main style={{ backgroundColor: "#e6f0ff" }}>
        <div className="container">
          <h2 className="pb-3 pt-3">Cart Items ({cartItems.length})</h2>
          <div className="row">
            <div className="col-8">
              <div className="row">
                {cartItems.map((product) => {
                  const cartId = cartMap.get(product._id);

                  return (
                    <div key={product.id}>
                      <div className="card mb-4">
                        <div className="row">
                          {/* IMAGE CARD */}
                          <div className="col-6 ">
                            <img
                              src={product.imageUrl}
                              className="img-fluid rounded"
                              alt={product.smallHeader}
                              style={{
                                height: "90%",
                                display: "block",
                                margin: "auto auto",
                              }}
                            />
                          </div>

                          {/* DETAILS CARD */}
                          <div className="col-6 p-2">
                            <div className="card-body">
                              <h4 className="card-title fw-bold fs-4">
                                {product.smallHeader}
                              </h4>
                              <p className="fw-semibold">
                                {product.ratingCount} ratings &{" "}
                                {product.reviewsCount} reviews
                              </p>
                              <div className="features pt-3 fw-regular fs-6">
                                <p className="mb-1">
                                  <span className="fw-semibold">Color : </span>
                                  {product.variant.color}
                                </p>
                                <p className="mb-1">
                                  <span className="fw-semibold">RAM : </span>
                                  {product.variant.ram}
                                </p>
                                <p className="mb-1">
                                  <span className="fw-semibold">
                                    Storage :{" "}
                                  </span>
                                  {product.variant.storage}
                                </p>
                              </div>
                              <div className="mt-4 d-flex g-2">
                                <button
                                  onClick={() => decreaseQty(product.cartId)}
                                  style={{ background: "none", border: "none" }}
                                >
                                  <i class="fa-solid fa-circle-minus"></i>
                                </button>
                                <div className="fs-4">
                                  {product.variant.quantity}
                                </div>
                                <button
                                  onClick={() => increaseQty(product.cartId)}
                                  style={{ background: "none", border: "none" }}
                                >
                                  <i class="fa-solid fa-circle-plus"></i>
                                </button>
                              </div>
                              <div className="mt-2">
                                <p className="fw-bold fs-1">
                                  {product.discountedPrice *
                                    product.variant.quantity}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(cartId)}
                                className="btn btn-danger"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CHECK OUT DETAILS */}
            <div className="col-4">
              <div className="card">
                <h4 className="fs-4 m-3 mb-2 fw-bold">Price Details</h4>
                <hr />
                <div className="priceDetails m-3 bg-danger rounded text-white">
                  <div className="m-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total Product Count ---</h5>
                    <p className="fs-4 mb-0 fw-bold">{totalProductCount}</p>
                  </div>
                  <div className="m-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Final Price ---</h5>
                    <p className="fs-4 mb-0 fw-bold">₹{finalCheckOutPrice}</p>
                  </div>
                  <hr />
                  <p className="m-3 fs-5">
                    Total saving on this order -- ₹{totalSavings}
                  </p>
                  <Link to={"/products/checkout"} className="btn btn-light m-3">
                    Place Order
                  </Link>
                </div>
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

export default Cart;
