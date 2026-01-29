import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useProductDetails from "../customHooks/useProductDetails";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [Loading, setLoading] = useState(true);

  // state variable for variant selection
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const { product: findProduct } = useProductDetails();
  console.log("in context page --", findProduct);
  

  // Fetch once
  useEffect(() => {
    fetch("https://smartphone-wishlist-db.vercel.app/wishlist")
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
        setLoading(false);
      });
  }, []);

  // ADD
  const addToWishlist = async (productId) => {
    if (!selectedColor || !selectedRam || !selectedStorage) {
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
            productId: findProduct._id,
            title: findProduct.smallHeader,
            image: findProduct.imageUrl,
            price: findProduct.discountedPrice,
            quantity: 1,
            variant: {
              color: selectedColor,
              ram: selectedRam,
              storage: selectedStorage,
            },
          }),
        },
      );

      if (!response.ok) {
        throw "Failed to add product";
      }

      const data = await response.json();
      // instant UI update
      setWishlist((prev) => [...prev, saved]);

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

      setWishList((prev) => prev.filter((item) => item._id !== wishlistId));
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
        selectedColor,
        selectedRam,
        selectedStorage,
        setSelectedColor,
        setSelectedRam,
        setSelectedStorage,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
