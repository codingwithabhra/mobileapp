import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCartContext } from "../components/cartContext";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";

const Profile = () => {
  const { user } = useCartContext();
  const {
    data: orders = [],
    loading,
    error,
  } = useFetch("https://orderhistory-model.vercel.app/orderhistory");
  console.log("This is from profile page -- ", user, orders, orders.length);

  if (loading) return <p>Loading the order summary...</p>;
  if (error) return <p>Error loading order summary.</p>;

  return (
    <>
      <header>
        <Header />
      </header>

      <main style={{ backgroundColor: "#e6f0ff" }}>
        <div className="container py-5">
          {/* ================= USER DETAILS ================= */}
          <div className="card p-4 mb-4">
            <div className="text-center">
              <img
                src={user.avatar}
                alt="profile"
                className="rounded-circle mb-3"
                width="90"
              />
              <h3>{user.name}</h3>
              <p className="text-muted">{user.email}</p>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Pincode:</strong> {user.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="card p-4 mb-4">
            <h4 className="mb-3">📦 Order Summary</h4>

            <div className="card p-4 mb-4">

              {orders.length === 0 && <p>No orders placed yet.</p>}

              {orders.map((order) => (
                <div key={order._id} className="mb-4">

                  {/* PRODUCTS INSIDE ORDER */}
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <div>
                        <h5 className="mb-1">{product.productName}</h5>
                        <p className="mb-0 text-muted">
                          {product.variant.color}, {product.variant.ram},{" "}
                          {product.variant.storage}
                        </p>
                        <p className="mb-0">Qty: {product.quantity}</p>
                      </div>

                      <p className="fw-bold mb-0">₹{product.price}</p>
                    </div>
                  ))}

                  <hr />

                  {/* TOTAL */}
                  <div className="d-flex justify-content-between">
                    <p className="fw-semibold">
                      Total ({order.products.length} item
                      {order.products.length > 1 ? "s" : ""})
                    </p>
                    <p className="fw-bold fs-5">₹{order.totalAmount}</p>
                  </div>
                </div>
              ))}
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

export default Profile;
