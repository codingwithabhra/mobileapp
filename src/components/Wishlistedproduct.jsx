import useFetch from "../components/useFetch";
import { useWishlist } from "./wishlistContext";
import { useCartContext } from "./cartContext";

const Wishlist = () => {
  const { wishlist, Loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCartContext();

  const { data: products, loading: pLoading } = useFetch(
    "https://smartphone-app.vercel.app/products",
  );

  if (pLoading || Loading) return <p>Loading wishlist...</p>;

  const wishlistProducts = wishlist
    .map((item) => {
      const product = products.find((p) => p._id === String(item.productId));
      if (!product || !item.variant) return null;
      return { ...product, wishlistId: item._id, variant: item.variant };
    })
    .filter(Boolean);

  console.log("wishlist products - ", wishlistProducts);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2 className="fw-bold mb-0">My Wishlist</h2>
        <span className="text-muted">({wishlistProducts.length} items)</span>
      </div>

      {!pLoading && wishlist.length === 0 && <p>Your wishlist is empty ❤️</p>}

      <div className="row g-4">
        {wishlistProducts.map((product) => {
          // const wishlistId = product.wishlistId;

          return (
            <div key={product._id} className="col-12 col-sm-6 col-lg-4 mb-4">
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
                  <h5 className="fw-semibold mb-1">{product.smallHeader}</h5>

                  <p className="text-muted small mb-2">{product.largeHeader}</p>

                  <p className="small fw-medium mb-3">
                    {product.variant?.color} • {product.variant?.ram} •{" "}
                    {product.variant?.storage}
                  </p>

                  <div className="mt-auto d-flex align-items-center justify-content-between">
                    {/* PRICE */}
                    <h4 className="fw-bold mb-0">₹{product.discountedPrice}</h4>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm px-3"
                        onClick={() => removeFromWishlist(product.wishlistId)}
                      >
                        Remove
                      </button>

                      <button
                        className="btn btn-primary btn-sm px-3"
                        onClick={() => {
                          addToCart({
                            productId: product._id,
                            variant: {
                              color: product.variant.color,
                              ram: product.variant.ram,
                              storage: product.variant.storage,
                            },
                          });
                          removeFromWishlist(product.wishlistId);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
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
