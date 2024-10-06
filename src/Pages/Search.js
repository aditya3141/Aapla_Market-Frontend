import React from "react";
import Layout from "../Components/Layout/AllLayout";
import { NavLink } from "react-router-dom";
import { useSearch } from "../context/search";

import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center mt-4">
          <h2 className="mb-2">Search Resuts</h2>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>
        <div className="row g-4 mt-3">
          {values?.results.map((p) => (
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
                  {/* <div className="cart-box">
                    <NavLink
                      className="text-warning"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("कार्टमध्ये आयटम जोडलेला आहे.");
                      }}
                    ></NavLink>
                  </div> */}
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

export default Search;
