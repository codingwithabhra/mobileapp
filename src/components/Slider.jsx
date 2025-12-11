import React from "react";

const Slider = () => {
  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000" 
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://www.ringkestore.com/cdn/shop/files/2400x800_main-banner_2d2f1519-e67f-40f8-9189-edb1c92e1b74.jpg?v=1757442277&width=2400"
              className="d-block w-100"
              alt="iphone-banner"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.shopify.com/s/files/1/0024/9803/5810/files/jb-au-20250905-mobile-phoneas-samsung-s25-fe-carousel_carousel-homepage-desktop.png?v=1757032087&width=2048"
              className="d-block w-100"
              alt="samsung-banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
