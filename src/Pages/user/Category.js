import React, { useState, useEffect } from "react";

import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/Layout/AllLayout";

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {}
  };
  return (
    <Layout>
      <div style={{ overflowX: "hidden" }} className="mt-5">
        <div className="row">
          <NavLink to={"/"} className="col-5">
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
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">{products?.length} result found </h6>
        </div>

        <div className="row g-4 mt-3">
          {products?.map((p) => (
            <div className="col-6" key={p._id}>
              <div className="product-box">
                <div className="product-box-img">
                  <NavLink to={`/product/${p.slug}`}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </NavLink>
                  <div className="cart-box">
                    <NavLink className="text-warning"></NavLink>
                  </div>
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
    </Layout>
  );
};

export default Category;
