import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/AllLayout.js";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavLink, useHistory, useNavigate } from "react-router-dom";

import axios from "axios";
import { Checkbox, Modal, Radio } from "antd";
import { Prices } from "../Components/Prices.js";
// Import Swiper styles
import "swiper/css";
import SerchBar from "../Components/forms/SerchBar.js";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";
import background from "../Components/video/bg video.mp4";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [visible, setVisible] = useState(false);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://aapla-market-backend.vercel.app/api/v1/category/gets-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://aapla-market-backend.vercel.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;

    loadMore();
  }, [page]);

  // get all Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://aapla-market-backend.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://aapla-market-backend.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://aapla-market-backend.vercel.app/api/v1/product/product-filter",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      toast.error("Product is already in the cart.");
      history("/cart");
    } else {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("Product added to cart.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <section>
          {/* search section Start */}
          <div className="custom-container">
            <div className="theme-form search-head">
              <SerchBar />
            </div>
          </div>
        </section>
        {/* banner section start */}
        <section className="banner-wapper">
          <div className="custom-container">
            <div className="banner-bg">
              <img
                className="img-fluid img-bg w-100"
                src="https://themes.pixelstrap.com/fuzzy/assets/images/banner/banner-1.jpg"
                alt="banner-1"
              />
              <div className="banner-content">
                <h2 className="fw-semibold">Best Selling</h2>
                <h4>Comforts &amp; Modern life Stylish Sofa</h4>
              </div>
              <a className="more-btn">
                <h4>View More</h4>
                <i className="iconsax right-arrow" data-icon="arrow-right">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4311 18.8211C14.2411 18.8211 14.0511 18.7511 13.9011 18.6011C13.6111 18.3111 13.6111 17.8311 13.9011 17.5411L19.4411 12.0011L13.9011 6.46109C13.6111 6.17109 13.6111 5.69109 13.9011 5.40109C14.1911 5.11109 14.6711 5.11109 14.9611 5.40109L21.0311 11.4711C21.3211 11.7611 21.3211 12.2411 21.0311 12.5311L14.9611 18.6011C14.8111 18.7511 14.6211 18.8211 14.4311 18.8211Z"
                      fill="#292D32"
                    />
                    <path
                      d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                      fill="#292D32"
                    />
                  </svg>
                </i>
              </a>
            </div>
          </div>
        </section>

        {/* categories section start */}
        <>
          <Swiper
            className="mySwiper"
            slidesPerView={5}
            centeredSlides={true}
            spaceBetween={10}
            navigation={true}
          >
            <SwiperSlide></SwiperSlide>
            <SwiperSlide className="d-flex gap-3 mt-4">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="categories-item swiper-s"
                >
                  <h4 className="">{c.name}</h4>
                </Checkbox>
              ))}
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </>
        {/* categories section end */}
        <section className="section-t-space">
          <div className="custom-container">
            <div className="title">
              <h2>Products</h2>
            </div>
            <div className="row g-4">
              {products?.map((p) => (
                <div className="col-6" key={p._id}>
                  <div className="product-box">
                    <div className="product-box-img">
                      <NavLink to={`/product/${p.slug}`}>
                        <img
                          src={`https://aapla-market-backend.vercel.app/api/v1/product/product-photo/${p._id}`}
                          className="img"
                          alt={p.name}
                        />

                        {/* <div className="cart-box">
                          <NavLink
                            className="cart-bag"
                            onClick={() => handleAddToCart(p)}
                          >
                            <i className="iconsax bag" data-icon="basket-2">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
                                  stroke="#292D32"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8.99999 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H7.99999C3.72999 8 3.02999 9.99 3.29999 12.43L4.04999 18.43C4.25999 20.39 4.97999 22 8.99999 22Z"
                                  stroke="#292D32"
                                  strokeWidth="1.5"
                                  strokeMiterlimit={10}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15.4955 12H15.5045"
                                  stroke="#292D32"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8.49451 12H8.50349"
                                  stroke="#292D32"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </i>
                          </NavLink>
                        </div> */}
                      </NavLink>
                    </div>
                    <div className="like-btn ">
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
                      <h5>{p.description}</h5>
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
          </div>
        </section>

        <div className="m-3 p-3">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
                loadMore();
              }}
            >
              {loading ? "Loading..." : "Loadmore"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
