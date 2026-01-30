import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useProductDetails from "../customHooks/useProductDetails";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [Loading, setLoading] = useState(true);

  // const [cartItems, setCartItems] = useState([]);

  // Fetch once
  useEffect(() => {
    fetch("https://smartphone-wishlist-db.vercel.app/wishlist")
      .then((res) => res.json())
      .then((data) => {
        setWishlist(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setWishlist([]);
        setLoading(false);
      });
  }, []);

  // ADD
  const addToWishlist = async ({ productId, title, image, price, variant }) => {
    if (!variant?.color || !variant?.ram || !variant?.storage) {
      toast.dark("Please select color, RAM and storage");
      return;
    }
    try {
      const response = await fetch(
        "https://smartphone-wishlist-db.vercel.app/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            title,
            image,
            price,
            quantity: 1,
            variant,
          }),
        },
      );

      if (!response.ok) {
        throw "Failed to add product";
      }

      const data = await response.json();
      // instant UI update
      setWishlist((prev) => [...prev, data]);

      // RESET VARIANTS HERE
      setSelectedColor("");
      setSelectedRam("");
      setSelectedStorage("");

      console.log("Product added successfully", data);
      toast.success("Added to wishlist ❤️");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // REMOVE
  const removeFromWishlist = async (wishlistId) => {
    try {
      const response = await fetch(
        `https://smartphone-wishlist-db.vercel.app/wishlist/${wishlistId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw Error("Failed to remove product");
      }

      toast.success("Removed from wishlist ❌");

      setWishlist((prev) => prev.filter((item) => item._id !== wishlistId));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        Loading,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
