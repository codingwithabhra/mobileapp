import Header from "../components/Header";
import Footer from "../components/Footer";
import Wishlistedproduct from "../components/Wishlistedproduct";


const Wishlist = () => {

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ flexShrink: 0 }}>
        <Header />
      </header>

      <main className="py-4" style={{ backgroundColor: "#e6f0ff", flex: 1, overflowY: "auto", overflowX: "hidden", }}>
        <div className="container">
          <Wishlistedproduct />
        </div>
      </main>

      <footer style={{ flexShrink: 0 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Wishlist;
