import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../components/useFetch";
import { useState } from "react";
import { useEffect } from "react";

const Wishlist = () => {
  const { data: wishlistData, loading: wlLoaing } = useFetch(
    "https://smartphone-wishlist-db.vercel.app/wishlist"
  );
  console.log("items from wishlist - ", wishlistData);

  const { data: products, loading: pLoading } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );
  console.log("items from product-list - ", products);

  // useState to update UI
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    if (wishlistData) setWishList(wishlistData);
  }, [wishlistData]);

  if (wlLoaing || pLoading) return <p>Loading wishlist...</p>;
  if (!wishlistData || !products) return <p>Something went wrong</p>;

  const wishlistMap = new Map(
    wishlist.map((item) => [item.productId, item._id])
  );

  const wishlistProducts = products.filter((product) =>
    wishlistMap.has(product._id)
  );
  console.log("wishlist products - ", wishlistProducts);

  // REMOVE FUNCTION
  const removeFromWishlist = async (wishlistId) => {
    try {
      const response = await fetch(
        `https://smartphone-wishlist-db.vercel.app/wishlist/${wishlistId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw Error("Failed to remove product");
      }

      alert("Removed from wishlist ❌");

      setWishList((prev) => prev.filter((item) => item._id !== wishlistId));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <main className="py-4" style={{ backgroundColor: "#e6f0ff" }}>
        <div className="container">
          <h2 className="pb-3">My Wishlist ({wishlistProducts.length})</h2>

          {wishlistProducts.length === 0 && <p>Your wishlist is empty ❤️</p>}

          <div className="row">
            {wishlistProducts.map((product) => {
              const wishlistId = wishlistMap.get(product._id);

              return (
                <div key={product._id} className="col-4 mb-3">
                  <div className="card p-3 mb-4">
                    <img
                      src={product.imageUrl}
                      alt={product.smallHeader}
                      className="img-fluid"
                    />

                    <h5 className="fw-regular fs-3">{product.smallHeader}</h5>
                    <p>{product.largeHeader}</p>

                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="fs-3">₹{product.discountedPrice}</h4>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromWishlist(wishlistId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Wishlist;
