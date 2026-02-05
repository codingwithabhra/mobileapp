import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "./useFetch";
import { toast } from "react-toastify";
import { useWishlist } from "./wishlistContext";

const cartContext = createContext();
export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { addToWishlist, refetchWishlist } = useWishlist();

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

  const { data: addressData, loading: addressLoading } = useFetch(
    "https://address-model-y8z6.vercel.app/address",
  );

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
  const [addresses, setAddresses] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState(1);

  useEffect(() => {
    if (Array.isArray(addressData)) {
      setAddresses(addressData);
      if (addressData.length && !selectedAddressId) {
        setSelectedAddressId(addressData[0].id);
      }
    }
  }, [addressData]);

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setCartList(cartData);
    } else {
      setCartList([]);
    }
  }, [cartData]);

  // // SELECT ADDRESS
  // const selectAddress = (id) => {
  //   setSelectedAddressId(id);
  // };

  // // GET SELECTED ADDRESS
  // const selectedAddress = addresses.find(
  //   (addr) => addr.id === selectedAddressId,
  // );

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

  const isProductAlreadyInCart = (productId, variant) => {
    return cartlist.some(
      (item) =>
        item.productId === productId &&
        item.variant.color === variant.color &&
        item.variant.ram === variant.ram &&
        item.variant.storage === variant.storage,
    );
  };

  // for adding to cart ----------------------------------------------------
  const addToCart = async ({ productId, variant }) => {
    if (!variant?.color || !variant?.ram || !variant?.storage) {
      toast.dark("Please select color, RAM and storage");
      return;
    }

    // DUPLICATION CHECK
    const alreadyExists = isProductAlreadyInCart(productId, variant);

    if (alreadyExists) {
      toast.dark("This product is already added in cart");
      return;
    }

    try {
      const response = await fetch("https://cartmodel.vercel.app/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          variant: {
            color: variant.color,
            storage: variant.storage,
            ram: variant.ram,
            quantity: 1,
          },
        }),
      });

      if (!response.ok) {
        throw "Failed to add to cart";
      }

      // Fetch updated cartlist after adding
      const fetchResponse = await fetch("https://cartmodel.vercel.app/cart");
      const updatecart = await fetchResponse.json();
      setCartList(Array.isArray(updatecart) ? updatecart : []);

      const data = await response.json();

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

  // MOVING ITEM FROM CART TO WISHLIST
  const moveToWishlist = async ({
    cartId,
    productId,
    title,
    image,
    price,
    variant,
  }) => {
    await addToWishlist({ productId, title, image, price, variant });
    refetchWishlist();
    removeFromCart(cartId);
  };

  //  ADD NEW ADDRESS
  const addAddress = async (newAddress) => {
    console.log("from cart context, New address -- ", newAddress);

    try {
      const response = await fetch(
        "https://address-model-y8z6.vercel.app/address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAddress),
        },
      );

      if (!response.ok) throw "Failed to add address";

      // Fetch updated address after adding
      const fetchResponse = await fetch(
        "https://address-model-y8z6.vercel.app/address",
      );
      const updateaddress = await fetchResponse.json();
      setAddresses(Array.isArray(updateaddress) ? updateaddress : []);

      const data = await response.json();
      console.log("from cart context, data --", data);

      // setAddresses((prev) => [...prev, data]);
      toast.success("Address added successfully");
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  // UPDATE ADDRESS (DB + UI)
  const editAddress = async (id, updatedAddress) => {
    try {
      const response = await fetch(
        `https://address-model-y8z6.vercel.app/address/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAddress),
        },
      );

      if (!response.ok) throw "Update failed";

      const updated = await response.json();

      console.log("updated response after edit -- ", updated);
      
      setAddresses((prev) =>
        prev.map((addr) => (addr._id === id ? updated : addr)),
      );

      toast.success("Address updated");
    } catch (error) {
      toast.error("Failed to update address");
    }
  };

  // DELETE ADDRESS (DB + UI)
  const removeAddress = async (id) => {
    try {
      const response = await fetch(
        `https://address-model-y8z6.vercel.app/address/${id}`,
        { method: "DELETE" },
      );

      if (!response.ok) throw "Delete failed";

      setAddresses((prev) => prev.filter((addr) => addr._id !== id));

      toast.success("Address deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete address");
    }
  };

  // useEffect(() => {
  //   if (selectedAddress) {
  //     setUser((prev) => ({
  //       ...prev,
  //       phone: selectedAddress.phone,
  //       address: selectedAddress.address,
  //       pincode: selectedAddress.pincode,
  //     }));
  //   }
  // }, [selectedAddress]);

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
        moveToWishlist,
        addresses,
        addAddress,
        editAddress,
        removeAddress,
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
