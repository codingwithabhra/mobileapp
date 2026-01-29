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

  // if (filteredProducts.length === 0) return <p>Products not found.</p>;

  return (
    <>
      <div style={{ backgroundColor: "#e6f0ff", minHeight: "100vh" }}>
        <div className="container">
          <h2 className="p-4">
            Showing All Products (Total {filteredProducts.length} Products)
          </h2>
          <div className="row p-4">
            {filteredProducts.length === 0 && <p>Products not found.</p>}


            {filteredProducts?.map((product) => (
              <div key={product.id} className="mb-4">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/products/productdetails/${product._id}`}
                >
                  <div className="card shadow-sm border-0 p-3">
                    <div className="row align-items-center">
                      {/* IMAGE CARD */}
                      <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
                        <img
                          src={product.imageUrl}
                          className="img-fluid rounded"
                          alt={product.smallHeader}
                          style={{ maxHeight: "180px", objectFit: "contain" }}
                        />
                      </div>

                      {/* DETAILS CARD */}
                      <div className="col-12 col-md-5">
                        <div className="card-body">
                          <h5 className="card-title fw-bold fs-4 mb-1">
                            {product.smallHeader}
                          </h5>
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <div className="card-text">{product.modelRating}</div>
                            <div>
                              <StarRating rating={product.modelRating} />
                            </div>
                          </div>
                          <p className="text-muted small mb-2">
                            {product.ratingCount} ratings &{" "}
                            {product.reviewsCount} reviews
                          </p>
                          <ul className="features list-unstyled small mb-0">
                            <li className="mb-1">{product.display}</li>
                            <li className="mb-1">{product.frontCam}</li>
                            <li className="mb-1">{product.backCam}</li>
                            <li className="mb-1">{product.battery}</li>
                            <li className="mb-1">{product.os}</li>
                          </ul>
                        </div>
                      </div>

                      {/* PRICE CARD */}
                      <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
                        <div className="card-body">
                          <h4 className="fw-bold mb-1">
                            ₹{product.discountedPrice}{" "}
                          </h4>
                          <p className="text-muted text-decoration-line-through small mb-0">
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
