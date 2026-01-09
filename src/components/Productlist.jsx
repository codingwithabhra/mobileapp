import React from "react";
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { useFilterContext } from "./filterContext";

const Productlist = () => {
  const { filter } = useFilterContext();
  const { data, loading, error } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );
  const brandName = useParams();
  console.log(brandName);

  if (loading) return <p>Loading product list ...</p>;
  if (error) return <p>Error loading product list ...</p>;

  // Category filter first
  const categoryProducts = data?.filter(
    (product) =>
      product.brand.toLowerCase() === brandName.brandName.toLowerCase()
  );

  // Apply context filters
  const filteredProducts = categoryProducts?.filter((product) => {
    const ramMatch =
      filter.ram.length === 0 ||
      product.ram.some((ram) => filter.ram.includes(ram));

    const storageMatch =
      filter.storage.length === 0 ||
      product.storage.some((storage) => filter.storage.includes(storage));

    const priceMatch =
      filter.price.length === 0 ||
      filter.price.some((p) => product.discountedPrice <= Number(p));

    console.log(ramMatch, storageMatch, priceMatch);

    return ramMatch && storageMatch && priceMatch;
  });

  if (filteredProducts.length === 0) return <p>Products not found.</p>;

  return (
    <>
      <div style={{ backgroundColor: "#e6f0ff" }} className="h-100">
        <div className="container">
          <h2 className="p-4">
            Showing All Products (Total {filteredProducts.length} Products)
          </h2>
          <div className="row p-4">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/products/productdetails/${product._id}`}
                >
                  <div className="card" style={{ border: "none" }}>
                    <div className="row g-0">
                      {/* IMAGE CARD */}
                      <div className="col-4 d-flex justify-content-center align-items-center">
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
                      <div className="col-4 p-2">
                        <div className="card-body">
                          <h4 className="card-title fw-bold fs-4">
                            {product.smallHeader}
                          </h4>
                          <div className="d-flex align-items-center gap-2">
                            <div className="card-text">{product.modelRating}</div>
                            <div>
                              <StarRating rating={product.modelRating} />
                            </div>
                          </div>
                          <p className="fw-semibold">
                            {product.ratingCount} ratings &{" "}
                            {product.reviewsCount} reviews
                          </p>
                          <div className="features pt-3 fw-regular fs-6">
                            <p className="mb-1">{product.display}</p>
                            <p className="mb-1">{product.frontCam}</p>
                            <p className="mb-1">{product.backCam}</p>
                            <p className="mb-1">{product.battery}</p>
                            <p className="mb-1">{product.os}</p>
                          </div>
                        </div>
                      </div>

                      {/* PRICE CARD */}
                      <div className="col-4 p-2">
                        <div className="card-body">
                          <h4 className="card-text fw-bold fs-2">
                            ₹{product.discountedPrice}{" "}
                          </h4>
                          <p className="fw-normal fs-6 text-decoration-line-through">
                            ₹{product.originalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Productlist;
