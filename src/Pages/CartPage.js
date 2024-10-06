import Layout from "../Components/Layout/AllLayout";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [data, setData] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint using Axios
        const response = await axios.get(
          "https://aapla-market-backend.onrender.com/api/v1/login/sucess",
          {
            withCredentials: true,
          }
        );
        // Once data is fetched, update the state
        setData(response.data);
      } catch (error) {
        // If an error occurs, update the state with the error
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    const updatedCart = cart.map((item) => {
      initialQuantities[item._id] = item.qty;
      return {
        ...item,
        originalPrice: item.originalPrice || item.price / item.qty, // Ensure originalPrice is set
      };
    });
    setCart(updatedCart);
    setQuantities(initialQuantities);
  }, [cart, setCart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      // Update local state with new quantity
      const updatedQuantities = {
        ...quantities,
        [productId]: newQuantity,
      };
      setQuantities(updatedQuantities);

      // Find the original price of the product
      const originalItem = cart.find((item) => item._id === productId);
      const originalPrice = originalItem
        ? originalItem.originalPrice || originalItem.price
        : 0;

      // Update cart state with new quantity and recalculated price
      const updatedCart = cart.map((item) => {
        if (item._id === productId) {
          const updatedItem = {
            ...item,
            qty: newQuantity,
            price: originalPrice * newQuantity, // Recalculate based on the original price and new quantity
          };
          return updatedItem;
        }
        return item;
      });

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Send the updated cart to the backend
      const cartData = updatedCart.map((item) => ({
        productId: item._id,
        qty: item.qty,
        price: item.price, // Ensure price is sent as updated price
      }));

      await axios.post(
        "https://aapla-market-backend.onrender.com/api/v1/payment",
        { cart: cartData },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
    } catch (error) {}
  };

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      return 0;
    }
  };

  const PaymentHandle = () => {
    if (totalPrice() < 100) {
      toast.error("Minimum order limit is 100 Rupees.");
      navigate("/cart");
    } else {
      navigate("/update-address");
    }
  };

  const removeCartItem = (productId) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("An error occurred while removing the item.");
    }
  };

  return (
    <Layout>
      <div>
        {/* cart section start */}
        <section>
          <NavLink to={"/"} className="product-back">
            <span className="product-back position-absolute left-0">
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
          <h3 className="text-center mb-3 text-warning">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : `Your Cart Is Empty`}
          </h3>
          <div className="custom-container">
            <ul className="horizontal-product-list">
              {cart?.map((product) => (
                <li className="cart-product-box" key={product._id}>
                  <div className="horizontal-product-box">
                    <div className="horizontal-product-img">
                      <NavLink to={`/product/${product.slug}`}>
                        <img
                          className="img-fluid img"
                          src={`https://aapla-market-backend.onrender.com/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                        />
                      </NavLink>
                    </div>
                    <div className="horizontal-product-details">
                      <div className="d-flex align-items-center justify-content-between">
                        <NavLink to={`/product/${product.slug}`}>
                          <h4>{product.name.substring(0, 20)}</h4>
                        </NavLink>
                        <span
                          className="iconsax trash text-warning fs-5"
                          onClick={() => removeCartItem(product._id)}
                        >
                          <AiOutlineDelete />
                        </span>
                      </div>
                      <ul className="product-info">
                        <li>
                          Qty:{" "}
                          <select
                            value={quantities[product._id] || product.qty}
                            onChange={(e) =>
                              handleQuantityChange(
                                product._id,
                                parseInt(e.target.value)
                              )
                            }
                            style={{
                              border: "none",
                              borderRadius: "6px",
                              padding: "0 7px",
                            }}
                          >
                            {[...Array(5).keys()].map((index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </li>
                      </ul>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center justify-content-between w-100 gap-2">
                          <h3 className="fw-semibold">
                            Price: {product.price} &#8377;
                          </h3>

                          {product.selectedSize && (
                            <h4>
                              <span style={{ fontWeight: "400" }}>
                                Selected Size:
                              </span>{" "}
                              <span>{product.selectedSize}</span>
                            </h4>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* cart section end */}
        {/* cart bottom start */}
        <section className="bill-details section-b-space">
          <div className="custom-container">
            <div className="total-detail">
              <div className="sub-total d-flex justify-content-between">
                <h5 className="light-text">Sub Total</h5>
                <h4 className="fw-medium">{totalPrice()} &#8377;</h4>
              </div>
              <div className="sub-total mt-3 d-flex justify-content-between">
                <h5 className="light-text">Shipping charge</h5>
                <h4 className="fw-medium">0 &#8377;</h4>
              </div>
              <div className="sub-total mt-3 mb-3 d-flex justify-content-between">
                <h5 className="fw-medium light-text">Discount (10%)</h5>
                <h4 className="fw-medium">0 &#8377;</h4>
              </div>
              <div className="grand-total pt-3 d-flex justify-content-between">
                <h5 className="fw-medium">Grand Total</h5>
                <h4 className="fw-semibold amount">{totalPrice()} &#8377;</h4>
              </div>
            </div>

            <div>
              {auth?.token || data?.user?.googleId ? (
                <button className="btn theme-btn w-100" onClick={PaymentHandle}>
                  Continue To Payment
                </button>
              ) : (
                <button
                  className="btn theme-btn w-100"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Login To Checkout
                </button>
              )}
            </div>
          </div>
        </section>
        {/* cart bottom end */}
      </div>
    </Layout>
  );
};

export default CartPage;
