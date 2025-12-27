import React from "react";
import useFetch from "../components/useFetch";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { data, loading, error } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );
  const productId = useParams();

  if (loading) return <p>Loading the product...</p>;
  if (error) return <p>Error loading product.</p>;

  const findProduct = data?.find(
    (product) => product._id === productId.productId
  );
  console.log(findProduct);

  if (!findProduct) return <p>Product not found.</p>;

  const percentageDiscount = Math.round(
    (findProduct.originalPrice - findProduct.discountedPrice) *
      (100 / findProduct.originalPrice)
  );

  // for wishlist management ----------------------------------------------------
  const addToWishlist = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw "Failed to add product";
      }

      const data = await response.json();
      console.log("Product added successfully", data);
      alert("Added to wishlist ❤️");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="card mt-5 mb-5" style={{ border: "none" }}>
            <div className="row g-5">
              <div className="col-md-4">
                <img
                  src={findProduct.imageUrl}
                  className="img-fluid rounded-start"
                  alt="..."
                />
                <div className="d-flex flex-column gap-2 mt-3">
                  <button className="btn btn-primary w-100" onClick={()=> addToWishlist(findProduct._id)}>
                    Add to wishlist
                  </button>
                  <Link to={"/wishlist"}>
                    <button className="btn btn-outline-primary w-100">
                      Add to cart
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  {/* HEADING & REVIEWS */}
                  <div className="firstPart mb-4">
                    <h5 className="card-title fs-2 fw-normal">
                      {findProduct.smallHeader}, {findProduct.largeHeader}
                    </h5>
                    <div className="d-flex align-items-center gap-2">
                      <p className="card-text">{findProduct.modelRating}</p>
                      <p>
                        <StarRating rating={findProduct.modelRating} />
                      </p>
                    </div>
                    <p className="fw-semibold">
                      {findProduct.ratingCount} ratings &{" "}
                      {findProduct.reviewsCount} reviews
                    </p>
                  </div>

                  {/* PRICE & DISCOUNT */}
                  <div className="pricePart mb-4">
                    <h4 className="card-text fs-1 fw-bold">
                      ₹{findProduct.discountedPrice}{" "}
                      <span className="fw-normal fs-6 text-decoration-line-through">
                        ₹{findProduct.originalPrice}
                      </span>
                    </h4>
                    <p className="card-text fs-5 fw-light">
                      {percentageDiscount}% off
                    </p>
                  </div>

                  {/* COLOR */}
                  <div className="color d-flex gap-3 mb-2">
                    <h4 className="fs-5">Color :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {findProduct.color?.map((color) => (
                        <div key={color.index} className="fs-6">
                          {color.join(", ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RAM */}
                  <div className="color d-flex gap-3 mb-2">
                    <h4 className="fs-5">RAM :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {findProduct.ram?.map((ram) => (
                        <div key={ram.index} className="fs-6">
                          {ram.join(", ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROCESSOR */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Processor :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>
                        {findProduct.processor.brand}{" "}
                        {findProduct.processor.type}
                      </p>
                    </div>
                  </div>

                  {/* STORAGE */}
                  <div className="color d-flex gap-3 mb-2">
                    <h4 className="fs-5">Storage :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {findProduct.storage?.map((storage) => (
                        <div key={storage.index} className="fs-6">
                          {storage.join(", ")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DISPLAY */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Display :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.display}</p>
                    </div>
                  </div>

                  {/* FRONTCAMERA */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Front Camera :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.frontCam}</p>
                    </div>
                  </div>

                  {/* BACKCAMERA */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Back Camera :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.backCam}</p>
                    </div>
                  </div>

                  {/* BATTERY */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Battery :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.battery} charging</p>
                    </div>
                  </div>

                  {/* WEIGHT */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Weight :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.weight}</p>
                    </div>
                  </div>

                  {/* OS */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Operating system :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.os}</p>
                    </div>
                  </div>

                  {/* SIM SLOT */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Sim :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>
                        {findProduct.hybridSimSlot === true
                          ? "Hybrid"
                          : "Normal"}
                      </p>
                    </div>
                  </div>

                  {/* MODEL */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Model :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.newArrival === true ? "New" : "Old"}</p>
                    </div>
                  </div>

                  {/* BRAND */}
                  <div className="color d-flex gap-3">
                    <h4 className="fs-5">Brand :</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <p>{findProduct.brand}</p>
                    </div>
                  </div>
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

export default ProductDetails;
