import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Productlist from "../components/Productlist";
import { FilterProvider } from "../components/filterContext";

const ProductListing = () => {
  return (
    <FilterProvider>
      <header>
        <Header />
      </header>

      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <Sidebar />
            </div>

            <div className="col-lg-10">
              <Productlist />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </FilterProvider>
  );
};

export default ProductListing;
