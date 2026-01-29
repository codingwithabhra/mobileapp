import useFetch from "../components/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import { useWishlist } from "./wishlistContext";

const Wishlist = () => {

  const { addToWishlist, removeFromWishlist } = useWishlist();
  
  const { data: wishlistData, loading: wlLoaing } = useFetch(
    "https://smartphone-wishlist-db.vercel.app/wishlist",
  );
  console.log("items from wishlist - ", wishlistData);

  const { data: products, loading: pLoading } = useFetch(
    "https://smartphone-app.vercel.app/products",
  );
  console.log("items from product-list - ", products);

  // useState to update UI
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    if (Array.isArray(wishlistData)) {
      setWishList(wishlistData);
    } else {
      setWishList([]);
    }
  }, [wishlistData]);

  if (wlLoaing || pLoading) return <p>Loading wishlist...</p>;
  if (!wishlistData || !products) return <p>Something went wrong</p>;

  const wishlistMap = wishlist.length
    ? new Map(wishlist.map((item) => [item.productId, item._id]))
    : new Map();

  const wishlistProducts = wishlist.map((item) => {
    const product = products.find((p) => p._id === item.productId);

    return {
      ...product,
      wishlistId: item._id,
      variant: item.variant,
    };
  });

  console.log("wishlist products - ", wishlistProducts);

  // REMOVE FUNCTION
  // const removeFromWishlist = async (wishlistId) => {
  //   try {
  //     const response = await fetch(
  //       `https://smartphone-wishlist-db.vercel.app/wishlist/${wishlistId}`,
  //       {
  //         method: "DELETE",
  //       },
  //     );

  //     if (!response.ok) {
  //       throw Error("Failed to remove product");
  //     }

  //     toast.success("Removed from wishlist ❌");

  //     setWishList((prev) => prev.filter((item) => item._id !== wishlistId));
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  return (

    <>
          <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
            <h2 className="fw-bold mb-0">My Wishlist</h2>
            <span className="text-muted">({wishlistProducts.length} items)</span>
          </div>

          {wishlistProducts.length === 0 && <p>Your wishlist is empty ❤️</p>}

          <div className="row g-4">
            {wishlistProducts.map((product) => {
              const wishlistId = wishlistMap.get(product._id);

              return (
                <div
                  key={product._id}
                  className="col-12 col-sm-6 col-lg-4 mb-4"
                >
                  <div className="card h-100 shadow-sm border-0 rounded-4 p-3 mb-4">
                    {/* IMAGE */}
                    <div className="text-center p-3">
                      <img
                        src={product.imageUrl}
                        alt={product.smallHeader}
                        className="img-fluid"
                        style={{ maxHeight: "180px", objectFit: "contain" }}
                      />
                    </div>

                    {/* BODY */}
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-semibold mb-1">
                        {product.smallHeader}
                      </h5>

                      <p className="text-muted small mb-2">
                        {product.largeHeader}
                      </p>

                      <p className="small fw-medium mb-3">
                        {product.variant.color} • {product.variant.ram} •{" "}
                        {product.variant.storage}
                      </p>

                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <h4 className="fw-bold mb-0">
                          ₹{product.discountedPrice}
                        </h4>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromWishlist(wishlistId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

    </>
  );
};

export default Wishlist;
