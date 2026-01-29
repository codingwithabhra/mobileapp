import Header from "../components/Header";
import Footer from "../components/Footer";
import Checkedoutproducts from "../components/Checkedoutproducts";

const Checkout = () => {
  // const {
  //   cartlist,
  //   isLoading,
  //   isError,
  //   cartMap,
  //   cartItems,
  //   increaseQty,
  //   decreaseQty,
  //   finalCheckOutPrice,
  //   totalProductCount,
  //   totalSavings,
  //   removeFromCart,
  //   addresses,
  //   selectedAddress,
  //   selectedAddressId,
  //   addAddress,
  //   selectAddress,
  //   placeOrder,
  //   orderPlaced,
  //   setOrderPlaced,
  // } = useCartContext();

  // if (isLoading) {
  //   return (
  //     <div className="d-flex justify-content-center mt-5">
  //       <h4>Loading cart items...</h4>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <p className="text-danger">Something went wrong</p>;
  // }

  // useEffect(() => {
  //   if (orderPlaced) {
  //     const timer = setTimeout(() => {
  //       setOrderPlaced(false);
  //       window.location.replace("/");
  //     }, 2500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [orderPlaced]);

  // // const [showForm, setShowForm] = useState(false);
  // // const [formData, setFormData] = useState({
  // //   name: "",
  // //   phone: "",
  // //   address: "",
  // //   pincode: "",
  // // });

  // if (cartlist.length === 0) return <h3>Your cart is empty ❤️</h3>;

  // console.log("Cart items -- ", cartItems);

  return (
    <>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header style={{ flexShrink: 0 }}>
          <Header />
        </header>

        <main
          style={{
            backgroundColor: "#e6f0ff",
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="pt-3 pb-4"
        >
          <div className="container">
            <Checkedoutproducts />
          </div>
        </main>

        <footer style={{ flexShrink: 0 }}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Checkout;
