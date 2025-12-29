import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/productdetails/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/products/brand/:brandName",
    element: <ProductListing />,
  },
  {
    path: "/products/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/products/cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
