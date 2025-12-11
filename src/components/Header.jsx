import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor": "#0171be"}}>
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
          <div className="collapse navbar-collapse d-flex align-items-center" id="navbarSupportedContent">

            {/* HOME */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">
                  Home
                </Link>
              </li>
            </ul>

            {/* SEARCH */}
            <form className="d-flex mx-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>

            {/* LOGIN/CART */}
            <div className="rightPart ms-auto d-flex align-items-center gap-4">
                <button className="btn btn-danger">Login</button>
                <i className="fa-solid fa-heart" style={{"color": "#fff"}}></i>
                <i className="fa-solid fa-cart-shopping" style={{"color": "#fff"}}></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
