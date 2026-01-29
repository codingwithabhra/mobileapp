import { useParams } from "react-router-dom";
import useFetch from "../components/useFetch";

const useProductDetails = () => {
  const { productId } = useParams();

  const { data, loading, error } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );

  if (loading || error || !data) {
    return {
      product: null,
      loading,
      error,
      discountPercentage: null,
    };
  }

  const product = data.find((item) => item._id === productId);

  if (!product) {
    return {
      product: null,
      loading: false,
      error: "Product not found",
      discountPercentage: null,
    };
  }

  const discountPercentage = Math.round(
    (product.originalPrice - product.discountedPrice) *
      (100 / product.originalPrice)
  );

  return {
    product,
    loading: false,
    error: null,
    discountPercentage,
  };
};

export default useProductDetails;
