import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/AllLayout";
import { useCart } from "../context/cart";
import axios from "axios";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";

import { MdOutlineDeliveryDining } from "react-icons/md";
import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (e) => {
    const selected = e.target.value;
    setSelectedSize(selected);
  };

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://aapla-market-backend.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setImages(data.product.images || []);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://aapla-market-backend.onrender.com/api/v1/product/similer-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  // Scroll to top
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    // Ensure a size is selected before adding the product to the cart

    // Check if the product already exists in the cart
    if (exists) {
      toast.error("Product is already in the cart.");
    } else {
      // Add the selected size to the product object before adding it to the cart
      const productWithSize = {
        ...product,
        selectedSize: selectedSize, // Include the selected size in the product data
      };

      const newCart = [...cart, productWithSize]; // Add product with size to the cart
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart)); // Save cart to localStorage
      toast.success("Product added to cart.");
    }
  };

  return (
    <Layout>
      <ScrollToTop />

      {/* Product Details Section */}
      <div className="details-page" style={{ overflowX: "hidden" }}>
        <div>
          <header className="product-page-header">
            <div className="header-panel">
              <NavLink to={"/"} className="product-back">
                <span className="product-back">
                  <i className="iconsax back-btn" data-icon="arrow-left">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.57141 18.8211C9.38141 18.8211 9.19141 18.7511 9.04141 18.6011L2.97141 12.5311C2.68141 12.2411 2.68141 11.7611 2.97141 11.4711L9.04141 5.40109C9.33141 5.11109 9.81141 5.11109 10.1014 5.40109C10.3914 5.69109 10.3914 6.17109 10.1014 6.46109L4.56141 12.0011L10.1014 17.5411C10.3914 17.8311 10.3914 18.3111 10.1014 18.6011C9.96141 18.7511 9.76141 18.8211 9.57141 18.8211Z"
                        fill="#292D32"
                      />
                      <path
                        d="M20.5019 12.75H3.67188C3.26188 12.75 2.92188 12.41 2.92188 12C2.92188 11.59 3.26188 11.25 3.67188 11.25H20.5019C20.9119 11.25 21.2519 11.59 21.2519 12C21.2519 12.41 20.9119 12.75 20.5019 12.75Z"
                        fill="#292D32"
                      />
                    </svg>
                  </i>
                </span>
              </NavLink>
              <h3 className="theme-color">{product?.category?.name}</h3>
              <div className="d-flex gap-2"></div>
            </div>
          </header>

          {/* Product Image Section */}
          <section>
            <div className="product-image-slider">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
              >
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`http://localhost:9000/${image}`}
                        alt={`product_image_${index}`}
                        className="img img-responsive"
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <div>No images available</div>
                )}
              </Swiper>
            </div>
          </section>

          {/* Product Details Section */}
          <section className="pt-0">
            <div className="custom-container">
              <div className="product-details">
                <div className="product-name">
                  <h2 className="theme-color">{product.name}</h2>
                  <h6>20% OFF</h6>
                </div>
                <div className="ratings mt-1">
                  <div className="d-flex align-items-center gap-1">
                    <h4 className="theme-color fw-normal">4.0</h4>

                    <h4 className="reviews">156 Reviews</h4>
                  </div>
                </div>
                {product.weightUnit && (
                  <div>
                    <label>Weight:</label>
                    <span>{product.weightUnit}</span>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label htmlFor="sizes">Choose Size:</label>
                    <select value={selectedSize} onChange={handleSizeChange}>
                      <option value="">Select a Size</option>
                      {product.sizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="product-price">
                  <h3>{product.price}&#8377;</h3>
                </div>

                <p>{product.description}.</p>
                <div
                  className="accordion details-accordion"
                  id="accordionPanelsStayOpenExample"
                >
                  <div className="d-flex align-item-center gap-3">
                    <div>
                      <button
                        className="btn btn-warning fs-7"
                        type="button"
                        onClick={() => {
                          handleAddToCart(product);
                          navigate("/cart");
                        }}
                      >
                        Buy Now
                        <span className="fs-6">
                          <MdOutlineDeliveryDining />
                        </span>
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn theme-btn fs-7"
                        type="button"
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        Add To Cart
                        <span className="fs-6"></span>
                      </button>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingTwo">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-p2"
                      >
                        Check Delivery
                      </div>
                    </div>

                    <div className="accordion-body">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="416230 [ Kotoli Area Only]"
                          disabled
                        />
                        <button
                          className="btn theme-btn"
                          type="button"
                          id="button-addon2"
                        >
                          Check
                        </button>
                      </div>
                      <ul className="address-type">
                        <li>
                          <i className="iconsax icon" data-icon="truck-fast" />
                          <h6>Free Delivery</h6>
                        </li>
                        <li>
                          <i
                            className="iconsax icon"
                            data-icon="dollar-circle"
                          />
                          <h6>COD Available</h6>
                        </li>
                        <li>
                          <i className="iconsax icon" data-icon="box-rotate" />
                          <h6>21 days Return</h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <hr />

      {/* Similar Product Section */}
      <section
        className="similer-product section-b-space"
        style={{ overflowX: "hidden" }}
      >
        <div className="custom-container">
          <div className="title">
            <h2>Similar Products</h2>
            {relatedProducts.length < 1 && <h3>No similar Product Found</h3>}
          </div>
        </div>
        <div className="row g-4">
          {relatedProducts?.map((p) => (
            <div className="col-6" key={p._id}>
              <div className="product-box">
                <div className="product-box-img">
                  <NavLink to={`/product/${p.slug}`}>
                    <img
                      src={`https://aapla-market-backend.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    {/* <div className="cart-box">
                      <NavLink
                        className="text-warning"
                        onClick={() => {
                          handleAddToCart(p);
                        }}
                      ></NavLink>
                    </div> */}
                  </NavLink>
                </div>
                <div className="like-btn">
                  <div className="text-danger"></div>
                  <div className="effect-group">
                    <span className="effect" />
                    <span className="effect" />
                    <span className="effect" />
                    <span className="effect" />
                    <span className="effect" />
                  </div>
                </div>

                <div className="product-box-detail">
                  <h4>{p.name}</h4>
                  <h5>{p.description.substring(0, 30)}...</h5>
                  <div className="bottom-panel">
                    {/* <h5>{p.description.substring(0, 30)}...</h5> */}
                    <h3 className="price ">
                      {p.price}
                      <span className="fs-7">&#8377;</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
