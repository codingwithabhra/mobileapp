import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [Loading, setLoading] = useState(true);

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

  console.log("wish list from context -- ", wishlist);
  
    // REFETCH FUNCTION
  const refetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://smartphone-wishlist-db.vercel.app/wishlist"
      );
      const data = await res.json();
      setWishlist(Array.isArray(data) ? data : []);
    } catch (error) {
      setWishlist([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ADD
  const addToWishlist = async ({ productId, title, image, price, variant }) => {
    if (!variant?.color || !variant?.ram || !variant?.storage) {
      toast.dark("Please select color, RAM and storage");
      return;
    }

    // DUPLICATION CHECK
    const alreadyExists = wishlist.some(
      (item) =>
        item.productId === productId &&
        item.variant?.color === variant.color &&
        item.variant?.ram === variant.ram &&
        item.variant?.storage === variant.storage,
    );

    if (alreadyExists) {
      toast.dark("This product is already added in wishlist");
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

      // Fetch updated wishlist after adding
      const fetchResponse = await fetch(
        "https://smartphone-wishlist-db.vercel.app/wishlist",
      );
      const updatedWishlist = await fetchResponse.json();
      setWishlist(Array.isArray(updatedWishlist) ? updatedWishlist : []);

      console.log("Product added successfully");
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
        setWishlist,
        setLoading,
        addToWishlist,
        removeFromWishlist,
        refetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
