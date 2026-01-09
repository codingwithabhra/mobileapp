import React from "react";
import { useState, useEffect } from "react";
import { useFilterContext } from "./filterContext";

const Sidebar = () => {
  const { filter, updateFilter, clearFilter } = useFilterContext();

  useEffect(() => {
    console.log("FILTER STATE:", filter);
  }, [filter]);

  return (
    <>
      <div className="p-4 bg-grey">
        <h2 className="mb-4">Filter</h2>

        {/* RAM */}
        <div className="ram mb-4">
          <label htmlFor="ramType" className="fw-bold mb-1">
            RAM
          </label>
          <br />
          <input
            type="checkbox"
            checked={filter.ram.includes("4GB")}
            onChange={() => updateFilter("ram", "4GB")}
          />{" "}
          4GB <br />
          <input
            type="checkbox"
            checked={filter.ram.includes("6GB")}
            onChange={() => updateFilter("ram", "6GB")}
          />{" "}
          6GB <br />
          <input
            type="checkbox"
            checked={filter.ram.includes("8GB")}
            onChange={() => updateFilter("ram", "8GB")}
          />{" "}
          8GB <br />
          <input
            type="checkbox"
            checked={filter.ram.includes("12GB")}
            onChange={() => updateFilter("ram", "12GB")}
          />{" "}
          12GB <br />
        </div>

        {/* STORAGE */}
        <div className="storage mb-4">
          <label htmlFor="storageCapacity" className="fw-bold mb-1">
            STORAGE
          </label>
          <br />
          <input
            type="checkbox"
            checked={filter.storage.includes("64GB")}
            onChange={() => updateFilter("storage", "64GB")}
          />{" "}
          64GB <br />
          <input
            type="checkbox"
            checked={filter.storage.includes("128GB")}
            onChange={() => updateFilter("storage", "128GB")}
          />{" "}
          128GB <br />
          <input
            type="checkbox"
            checked={filter.storage.includes("256GB")}
            onChange={() => updateFilter("storage", "256GB")}
          />{" "}
          256GB <br />
          <input
            type="checkbox"
            checked={filter.storage.includes("1TB")}
            onChange={() => updateFilter("storage", "1TB")}
          />{" "}
          1TB <br />
        </div>

        {/* PRICE */}
        <div className="price mb-4">
          <label htmlFor="priceRange" className="fw-bold mb-1">
            PRICE
          </label>
          <br />
          <input
            type="checkbox"
            checked={filter.price.includes("10000")}
            onChange={() => updateFilter("price", "10000")}
          />{" "}
          10,000 & below <br />
          <input
            type="checkbox"
            checked={filter.price.includes("30000")}
            onChange={() => updateFilter("price", "30000")}
          />{" "}
          30,000 & below <br />
          <input
            type="checkbox"
            checked={filter.price.includes("60000")}
            onChange={() => updateFilter("price", "60000")}
          />{" "}
          60,000 & below <br />
          <input
            type="checkbox"
            checked={filter.price.includes("100000")}
            onChange={() => updateFilter("price", "100000")}
          />{" "}
          Above 60,000 <br />
        </div>

        <button className="btn btn-danger" onChange={clearFilter}>
          Clear Filters
        </button>
      </div>
    </>
  );
};

export default Sidebar;
