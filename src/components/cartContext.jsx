import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "./useFetch";

const cartContext = createContext();
export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const { data: productData, loading: productLoading } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );
  console.log(productData);

  const { data: cartData, loading: cartLoading } = useFetch(
    "https://cartmodel.vercel.app/cart"
  );
  console.log(cartData);

  const [cartlist, setCartList] = useState([]);

  useEffect(() => {
    if (cartData) setCartList(cartData);
  }, [cartData]);

  if (productLoading || cartLoading) return <p>Loading Cart Items...</p>;
  if (!productData || !cartData) return <p>Something went wrong</p>;

  const cartMap = cartlist.length ? new Map(cartlist.map((item) => [item.productId, item._id])) : new Map();

  const cartItems = cartlist.map((item) => {
    const product = productData.find((p) => p._id === item.productId);

    return {
      ...product,
      cartId: item._id,
      variant: item.variant,
      quantity: item.variant.quantity,
    };
  });

  console.log("cart items - ", cartItems);

  const increaseQty = (cartId) => {
    setCartList((prev) =>
      prev.map((item) =>
        item._id === cartId
          ? {
              ...item,
              variant: {
                ...item.variant,
                quantity: item.variant.quantity + 1,
              },
            }
          : item
      )
    );
  };

  const decreaseQty = (cartId) => {
    setCartList((prev) =>
      prev.map((item) =>
        item._id === cartId && item.variant.quantity > 1
          ? {
              ...item,
              variant: {
                ...item.variant,
                quantity: item.variant.quantity - 1,
              },
            }
          : item
      )
    );
  };

  const finalCheckOutPrice = cartItems.reduce(
    (count, acc) => count + acc.variant.quantity * acc.discountedPrice,
    0
  );
  console.log("quantity,final price -", finalCheckOutPrice);

  const totalProductCount = cartItems.reduce(
    (count, acc) => count + acc.variant.quantity,
    0
  );

  const totalSavings = cartItems.reduce(
    (count, acc) => count + acc.originalPrice - acc.discountedPrice,
    0
  );

  const removeFromCart = async (cartId) => {
    try {
      const response = await fetch(
        `https://cartmodel.vercel.app/cart/${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw Error("Failed to remove product");
      }

      alert("Removed from cart ❌");

      setCartList((prev) => prev.filter((item) => item._id !== cartId));
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // ---------------- CART (already existing)
  const [cartitems, setCartitems] = useState([]);

  // ---------------- ADDRESS STATE (NEW)
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Abhra Patra",
      phone: "9XXXXXXXXX",
      address: "Kolkata, India",
      pincode: "700001",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(1);

  //  ADD NEW ADDRESS
  const addAddress = (newAddress) => {
    setAddresses((prev) => [
      ...prev,
      { ...newAddress, id: Date.now() },
    ]);
  };

  //  SELECT ADDRESS
  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  //  GET SELECTED ADDRESS
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  return (
    <cartContext.Provider
      value={{
        cartlist,
        cartMap,
        cartItems,
        increaseQty,
        decreaseQty,
        finalCheckOutPrice,
        totalProductCount,
        totalSavings,
        removeFromCart,
        cartitems,
        addresses,
        selectedAddress,
        selectedAddressId,
        addAddress,
        selectAddress,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
