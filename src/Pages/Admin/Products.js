import React, { useState, useEffect } from "react";
import Adminmenu from "../../Components/Layout/Adminmenu";

import axios from "axios";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import Layout from "../../Components/Layout/AllLayout";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <Adminmenu />
        </div>

        <section className="section-t-space">
          <div className="custom-container">
            <div className="title">
              <h2>Products</h2>
              {/* <a href="shop.html">View All</a> */}
            </div>
            <div className="row g-4">
              {products?.map((p) => (
                <div className="col-6" key={p._id}>
                  <div className="product-box">
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link"
                    >
                      <div className="product-box-img">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
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
                        <div className="d-flex justify-content-between gap-3">
                          <h5>{p.description}</h5>
                          <h3 className="fw-semibold">
                            {p.price}
                            <span className="fs-5"></span>
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Products;
