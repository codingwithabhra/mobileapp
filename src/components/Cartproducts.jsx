import { Link } from "react-router-dom";
import { useCartContext } from "../components/cartContext";

const Cart = () => {
  const {
    cartlist,
    isLoading,
    isError,
    cartMap,
    cartItems,
    moveToWishlist,
    increaseQty,
    decreaseQty,
    finalCheckOutPrice,
    totalProductCount,
    totalSavings,
    removeFromCart,
  } = useCartContext();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Loading cart items...</h4>
      </div>
    );
  }

  if (isError) {
    return <p className="text-danger">Something went wrong</p>;
  }

  // if (cartlist.length === 0) return <h3>Your cart is empty</h3>;

  console.log("Cart items -- ", cartItems);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2 className="fw-bold mb-0">My Cart</h2>
        <span className="text-muted">({cartItems.length} items)</span>
      </div>
      {cartlist.length === 0 ? (
        <p>Your cart is empty ❤️</p>
      ) : (
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="row">
              {cartItems.map((product) => {
                const cartId = cartMap.get(product._id);

                return (
                  <div key={product.id}>
                    <div className="card mb-4">
                      <div className="row g-3">
                        {/* IMAGE CARD */}
                        <div className="col-12 col-md-4">
                          <img
                            src={product.imageUrl}
                            className="img-fluid rounded mx-auto d-block"
                            alt={product.smallHeader}
                            style={{
                              maxHeight: "220px",
                              objectFit: "contain",
                            }}
                          />
                        </div>

                        {/* DETAILS CARD */}
                        <div className="col-12 col-md-8 p-2">
                          <div className="card-body">
                            <h4 className="card-title fw-bold fs-4 mb-1">
                              {product.smallHeader}
                            </h4>
                            <p className="text-muted small mb-2">
                              {product.ratingCount} ratings &{" "}
                              {product.reviewsCount} reviews
                            </p>
                            <div className="features pt-3 fw-regular fs-6 d-flex flex-wrap gap-2 mt-2">
                              <p className="mb-1">
                                <span className="badge bg-light text-dark">
                                  Color :{" "}
                                </span>
                                {product.variant.color}
                              </p>
                              <p className="mb-1">
                                <span className="fw-semibold badge bg-light text-dark">
                                  RAM :{" "}
                                </span>
                                {product.variant.ram}
                              </p>
                              <p className="mb-1">
                                <span className="fw-semibold badge bg-light text-dark">
                                  Storage :{" "}
                                </span>
                                {product.variant.storage}
                              </p>
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-3">
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => decreaseQty(product.cartId)}
                              >
                                −
                              </button>

                              <span className="fw-bold fs-5">
                                {product.variant.quantity}
                              </span>

                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => increaseQty(product.cartId)}
                              >
                                +
                              </button>
                            </div>
                            <div className="mt-2">
                              <p className="fw-bold fs-4 fs-md-3 mt-2">
                                ₹
                                {product.discountedPrice *
                                  product.variant.quantity}
                              </p>
                            </div>
                            <div className="d-flex gap-3 mt-3">
                              <button
                                onClick={() => removeFromCart(product.cartId)}
                                className="btn btn-outline-danger btn-sm"
                              >
                                Remove
                              </button>

                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                  moveToWishlist ({
                                    cartId: product.cartId,
                                    productId: product._id,
                                    title: product.smallHeader,
                                    image: product.imageUrl,
                                    price: product.discountedPrice,
                                    variant: {
                                      color: product.variant.color,
                                      ram: product.variant.ram,
                                      storage: product.variant.storage,
                                    },
                                  });
                                }}
                              >
                                Move to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CHECK OUT DETAILS */}
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <div className="card position-lg-sticky top-0">
              <h4 className="fs-4 m-3 mb-2 fw-bold">Price Details</h4>
              <hr />
              <div className="priceDetails m-3 bg-danger rounded text-white">
                <div className="m-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Total Product Count ---</h5>
                  <p className="fs-4 mb-0 fw-bold">{totalProductCount}</p>
                </div>
                <div className="m-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Final Price ---</h5>
                  <p className="fs-4 mb-0 fw-bold">₹{finalCheckOutPrice}</p>
                </div>
                <hr />
                <p className="m-3 fs-5">
                  Total saving on this order -- ₹{totalSavings}
                </p>
                <Link to={"/products/checkout"} className="btn btn-light m-3">
                  Place Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
