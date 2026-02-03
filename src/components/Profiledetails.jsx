import { useCartContext } from "../components/cartContext";
import useFetch from "../components/useFetch";
import { useState } from "react";

const Profile = () => {
  const { user } = useCartContext();
  const {
    data: orders = [],
    loading,
    error,
  } = useFetch("https://orderhistory-model.vercel.app/orderhistory");
  console.log("This is from profile page -- ", user, orders, orders.length);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  if (loading) return <p>Loading the order summary...</p>;
  if (error) return <p>Error loading order summary.</p>;

  return (
    <>
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

      {/* ================= ORDER SUMMARY ================= */}
      <div className="card p-4 my-4">
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

              {/* ORDER INFO */}
              <div className="mb-3">
                <p className="mb-1">
                  <strong>Order ID:</strong> {order._id}
                </p>

                <p className="mb-1">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="mb-0">
                  <strong>Shipping Address:</strong>
                  <br />
                  {order.selectedAddress.name} <br />
                  {order.selectedAddress.addressLine} || 
                  Pincode: {order.selectedAddress.pincode} ||
                  Phone: {order.selectedAddress.phone}
                </p>
              </div>

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
    </>
  );
};

export default Profile;
