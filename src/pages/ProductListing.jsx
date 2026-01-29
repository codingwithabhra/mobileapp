import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Productlist from "../components/Productlist";
import { FilterProvider } from "../components/filterContext";
import { useState } from "react";
import "../App.css";

const ProductListing = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <FilterProvider>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header style={{ flexShrink: 0 }}>
          <Header />
        </header>

        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-lg-2 d-none d-lg-block"
              >
                <Sidebar />
              </div>

              <div
                className="col-lg-10"
              >
                {/* MOBILE FILTER BUTTON */}
                <div className="d-lg-none p-2">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setShowFilter(true)}
                  >
                    ☰ Filters
                  </button>
                </div>
                <Productlist />
              </div>
            </div>
          </div>
        </main>

        <footer style={{ flexShrink: 0 }}>
          <Footer />
        </footer>

        {/* MOBILE FILTER DRAWER */}
        {showFilter && (
          <>
            <div
              className="offcanvas offcanvas-start show"
              style={{ visibility: "visible", backgroundColor: "#fff", width: "80%", }}
            >
              <div className="offcanvas-header">
                <h5>Filters</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowFilter(false)}
                />
              </div>
              <div className="offcanvas-body">
                <Sidebar />
              </div>
            </div>

            {/* BACKDROP */}
            <div
              className="offcanvas-backdrop fade show"
              onClick={() => setShowFilter(false)}
            />
          </>
        )}
      </div>
    </FilterProvider>
  );
};

export default ProductListing;
