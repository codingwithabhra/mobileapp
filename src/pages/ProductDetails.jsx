import Header from "../components/Header";
import Footer from "../components/Footer";
import Detailedproduct from "../components/Detailedproduct";

const ProductDetails = () => {

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ flexShrink: 0 }}>
        <Header />
      </header>

      <main style={{ flex: 1, overflow: "scroll" }}>
        <div className="container d-flex justify-content-center align-items-center">
          <Detailedproduct />
        </div>
      </main>

      <footer style={{ flexShrink: 0 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default ProductDetails;
