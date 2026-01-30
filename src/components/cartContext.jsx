import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "./useFetch";
import { toast } from "react-toastify";

const cartContext = createContext();
export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetch("https://smartphone-app.vercel.app/products");
  console.log(productData);

  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useFetch("https://cartmodel.vercel.app/cart");
  console.log(cartData);

  const [cartlist, setCartList] = useState([]);

  // ---------------- USER STATE (SINGLE USER FOR LOGIN)
  const [user, setUser] = useState({
    name: "Abhra Patra",
    email: "abhra@example.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219988.png", // placeholder
    phone: "6541230893",
    address: "Kolkata, India",
    pincode: "700001",
  });

  // ---------------- ADDRESS STATE (NEW)
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Abhra Patra",
      phone: "6541230893",
      address: "Kolkata, India",
      pincode: "700001",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(1);

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setCartList(cartData);
    } else {
      setCartList([]);
    }
  }, [cartData]);

  // guard logic instead of JSX
  const isLoading = productLoading || cartLoading;
  const isError = productError || cartError || !productData;

  const cartMap = cartlist.length
    ? new Map(cartlist.map((item) => [item.productId, item._id]))
    : new Map();

  console.log("cart list --", cartlist);

  const cartItems =
    !isLoading && !isError
      ? cartlist
          .map((item) => {
            const product = productData.find((p) => p._id === item.productId);
            if (!product) return null;

            return {
              ...product,
              cartId: item._id,
              variant: item.variant,
              quantity: item.variant.quantity,
            };
          })
          .filter(Boolean)
      : [];

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
          : item,
      ),
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
          : item,
      ),
    );
  };

  const finalCheckOutPrice = cartItems.reduce(
    (count, acc) => count + acc.variant.quantity * acc.discountedPrice,
    0,
  );
  console.log("quantity,final price -", finalCheckOutPrice);

  const totalProductCount = cartItems.reduce(
    (count, acc) => count + acc.variant.quantity,
    0,
  );

  const totalSavings = cartItems.reduce(
    (count, acc) => count + acc.originalPrice - acc.discountedPrice,
    0,
  );

  // for adding to cart ----------------------------------------------------
  const addToCart = async ({ productId, variant }) => {
    if (!variant?.color || !variant?.ram || !variant?.storage) {
      toast.dark("Please select color, RAM and storage");
      return;
    }

    // UI update
    const tempCartItem = {
      _id: Date.now().toString(), // temp id
      productId,
      variant: { ...variant, quantity: 1 },
    };

    setCartList((prev) => [...prev, tempCartItem]);

    try {
      const response = await fetch("https://cartmodel.vercel.app/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          variant: {
            color: selectedColor,
            storage: selectedStorage,
            ram: selectedRam,
            quantity: 1,
          },
        }),
      });

      if (!response.ok) {
        throw "Failed to add to cart";
      }

      const data = await response.json();

      // 🔹 Replace temp item with DB item
      setCartList((prev) =>
        prev.map((item) => (item._id === tempCartItem._id ? data : item)),
      );
      console.log("Product added to cart", data);
      toast.success("Added to cart ❤️");
    } catch (error) {
      console.log(error);

      setCartList((prev) =>
        prev.filter((item) => item._id !== tempCartItem._id),
      );
      toast.error("Oops ! Something went wrong");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      const response = await fetch(
        `https://cartmodel.vercel.app/cart/${cartId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw Error("Failed to remove product");
      }

      toast.success("Removed from cart ❌");

      setCartList((prev) => prev.filter((item) => item._id !== cartId));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //  ADD NEW ADDRESS
  const addAddress = (newAddress) => {
    setAddresses((prev) => [...prev, { ...newAddress, id: Date.now() }]);
  };

  //  SELECT ADDRESS
  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  //  GET SELECTED ADDRESS
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId,
  );

  // Add order history to ORDER DB
  const placeOrder = async (cartId) => {
    try {
      const response = await fetch(
        "https://orderhistory-model.vercel.app/orderhistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: cartItems.map((item) => ({
              productId: item._id,
              productName: item.smallHeader,
              quantity: item.variant.quantity,
              price: item.discountedPrice,
              variant: {
                color: item.variant.color,
                ram: item.variant.ram,
                storage: item.variant.storage,
              },
            })),
            totalAmount: finalCheckOutPrice,
            selectedAddress: {
              name: selectedAddress.name,
              phone: selectedAddress.phone,
              addressLine: selectedAddress.address,
              pincode: selectedAddress.pincode,
            },
          }),
        },
      );

      if (!response.ok) {
        throw "Order failed";
      }

      // Clear cart DB
      await fetch(`https://cartmodel.vercel.app/cart/${cartId}`, {
        method: "DELETE",
      });

      // Clear frontend cart
      setCartList([]);

      const data = await response.json();
      console.log("Order history added successfully", data);
      toast.success("Order placed successfully ❤️");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartlist,
        isLoading,
        isError,
        cartMap,
        cartItems,
        increaseQty,
        decreaseQty,
        finalCheckOutPrice,
        totalProductCount,
        totalSavings,
        addToCart,
        removeFromCart,
        addresses,
        selectedAddress,
        selectedAddressId,
        addAddress,
        selectAddress,
        placeOrder,
        orderPlaced,
        setOrderPlaced,
        user,
        setUser,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
