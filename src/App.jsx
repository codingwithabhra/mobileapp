import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import useFetch from "./components/useFetch";
import { Link } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { data, loading, error } = useFetch(
    "https://smartphone-app.vercel.app/products"
  );
  console.log(data);

  if (loading) return <p>Product List is loading ...</p>;
  if (error) return <p>Error loading products</p>;

  const newArrivedProducts = data?.filter((event) => event.newArrival == true);
  // console.log(newArrivedProducts);

  const otherProducts = data?.filter((event) => event.newArrival !== true);
  // console.log(otherProducts);

  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Slider />
        <h2 className="text-center mt-5 fw-bold">New Arrivals</h2>

        <div className="container mb-5">
          <div className="row">
            {newArrivedProducts?.map((product) => (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-3 mt-4"
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/products/productdetails/${product._id}`}
                >
                  <div
                    className="card h-100 shadow bg-primary text-white"
                    style={{ border: "none" }}
                  >
                    <div className="row g-0">
                      <div className="col-3">
                        <img
                          src={product.imageUrl}
                          className="img-fluid rounded"
                          alt={product.smallHeader}
                          style={{ height: "100px" }}
                        />
                      </div>
                      <div className="col-9">
                        <div className="card-body">
                          <h5 className="card-title fw-bold fs-4">
                            {product.smallHeader}
                          </h5>
                          <p className="card-text fs-4">
                            ₹{product.discountedPrice}{" "}
                            <span className="fw-normal fs-6 text-decoration-line-through">
                              ₹{product.originalPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <h2 className="text-center mt-5 fw-bold">Select Category</h2>

        <div className="category mt-5 mb-5">
          <div className="container">
            <div className="row g-4 justify-content-center align-items-center">
              {/* APPLE CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none" to={"/product/productlist"}>
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://images.macrumors.com/t/myq0N5iVZ0Q9DG_s0E_XejgPgdY=/1600x/article-new/2025/09/iphone-17-pro-orange.jpg"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Apple Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* REALME CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none">
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://static2.realme.net/images/realme-13-pro-plus/color/0a.jpg"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Realme Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* SAMSUNG CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none">
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://androidcommunity.com/wp-content/uploads/2020/09/Samsung-Smartphone-Concept-Transparent-Display.jpg"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Samsung Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* MOTOROLLA CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none">
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://motorolanews.com/wp-content/uploads/2025/11/Moto-g_Blog-image_4.jpg"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Motorolla Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* PIXEL CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none">
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://media.wired.com/photos/68a7a913ababd253d6b1768f/4:3/w_5000,h_3750,c_limit/Google%20Pixel%2010%20Series%20SOURCE%20Julian%20Chokkattu.jpgp"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Google pixel Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* VIVO CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none">
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://i.ytimg.com/vi/nTd8t6dVmbU/maxresdefault.jpg"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Vivo Phones</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* OPPO CARD */}
              <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                <Link className="subCategory text-decoration-none">
                  <div className="card h-100">
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <img
                        src="https://i.cdn.newsbytesapp.com/images/l48420230710131411.png"
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div
                      className="card-body d-flex justify-content-center align-items-center bg-primary text-white"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text m-0 fs-5">Oppo Phones</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER PRODUCTS
        <h2 className="text-center mt-5 fw-bold">Other Products</h2>

        <div className="container mt-5 mb-5">
          <div className="row">
            {otherProducts?.map((product)=> (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-3"
              >
                <Link style={{ textDecoration: "none" }} to={`/products/${product._id}`}>
                  <div
                    className="card h-100 gradient-bg shadow"
                    style={{ backgroundColor: "#B8F1FF", border: "none", color: "#fff" }}
                  >
                    <div className="row g-0">
                      <div className="col-5 d-flex justify-content-center align-items-center">
                        <img
                          src={product.imageUrl}
                          className="img-fluid rounded"
                          alt={product.smallHeader}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-7">
                        <div className="card-body">
                          <h5 className="card-title fw-bold fs-5">
                            {product.smallHeader}
                          </h5>
                          <p className="card-text fw-bold fs-4">
                            ₹{product.discountedPrice}{" "}
                            <span className="fw-normal fs-6 text-decoration-line-through">
                              ₹{product.originalPrice}
                            </span>
                          </p>
                          <p className="card-text fs-6" style={{marginBottom: "5px", paddingLeft: "15px", textIndent: "-10PX"}}>
                          • {product.display}
                        </p>
                        <p className="card-text fs-6" style={{marginBottom: "5px", paddingLeft: "15px", textIndent: "-10PX"}}>
                            • {product.backCam}
                        </p>
                        
                        <p className="card-text fs-6" style={{marginBottom: "5px", paddingLeft: "15px", textIndent: "-10PX"}}>
                            • {product.battery}
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div> */}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
