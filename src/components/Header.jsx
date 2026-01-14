import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "./cartContext";
import useFetch from "./useFetch";

const Header = () => {
  const { user, cartlist } = useCartContext();

  const [searchTerm, setSearchTerm] = useState("");

  const { data: wishlistData, loading: wlLoaing } = useFetch(
    "https://smartphone-wishlist-db.vercel.app/wishlist"
  );
  console.log("items from wishlist - ", wishlistData);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        "https://smartphone-app.vercel.app/products"
      );
      const products = await response.json();

      const matchedProduct = products.find((product) =>
        product.smallHeader.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (!matchedProduct) {
        alert("❌ No product found");
        return;
      }

      // redirect without useNavigate
      window.location.href = `/products/productdetails/${matchedProduct._id}`;
    } catch (error) {
      console.error(error);
      alert("Something went wrong while searching");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#0171be" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            MySmartphoneApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex align-items-center"
            id="navbarSupportedContent"
          >
            {/* SEARCH */}
            <form className="d-flex mx-auto" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by model name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            {/* LOGIN/CART */}
            <div className="rightPart ms-auto d-flex align-items-center gap-4">
              <Link
                className="btn d-flex align-items-center gap-2"
                style={{ color: "#fff" }}
                to="/profile"
              >
                <img
                  src={user.avatar}
                  alt="user"
                  className="rounded-circle"
                  width="32"
                  height="32"
                />
                <span>{user.name}</span>
              </Link>

              {/* WISHLIST */}
              <Link to="/products/wishlist" className="position-relative">
                <i
                  className="fa-solid fa-heart fs-5"
                  style={{ color: "#fff" }}
                ></i>

                {wishlistData?.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {wishlistData.length}
                  </span>
                )}
              </Link>

              {/* CART */}
              <Link to="/products/cart" className="position-relative">
                <i
                  className="fa-solid fa-cart-shopping fs-5"
                  style={{ color: "#fff" }}
                ></i>

                {cartlist?.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {cartlist.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
