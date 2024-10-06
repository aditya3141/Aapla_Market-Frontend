import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/AllLayout";
import Adminmenu from "../../Components/Layout/Adminmenu";
import Toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [images, setImages] = useState([]);
  // New fields
  const [showWeight, setShowWeight] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [weightUnit, setWeightUnit] = useState("");
  const [sizes, setSizes] = useState([]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://aapla-market-backend.onrender.com/api/v1/category/gets-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      Toast.error("Something Went Wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("showWeight", showWeight); // boolean value
      productData.append("showSizes", showSizes); // boolean value

      // If weight is shown, append the weight unit

      // If sizes are shown, append the selected sizes

      if (photo) {
        productData.append("photo", photo);
      }
      images.forEach((image, index) => {
        productData.append(`images`, image);
      });

      // Visibility options for weight and sizes
      productData.append("showWeight", showWeight); // boolean value
      productData.append("showSizes", showSizes); // boolean value

      // If weight is shown, append the weight unit
      if (showWeight) {
        productData.append("weightUnit", weightUnit);
      }

      // If sizes are shown, append the selected sizes
      if (showSizes && sizes.length > 0) {
        sizes.forEach((size) => productData.append("sizes[]", size));
      }

      const { data } = await axios.post(
        "https://aapla-market-backend.onrender.com/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        Toast.error(data?.message);
      } else {
        Toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      Toast.error("Something went wrong");
    }
  };
  const handleSizeSelection = (e) => {
    const value = e.target.value;
    if (sizes.includes(value)) {
      setSizes(sizes.filter((size) => size !== value)); // Remove if already selected
    } else {
      setSizes([...sizes, value]); // Add new size
    }
  };
  return (
    <Layout>
      <div className="col-12">
        <Adminmenu />
      </div>
      <br />
      <div className="col-12 w-75 m-auto">
        <h2>Products</h2>
        <div className="form-group">
          <label className="form-label">Create Product</label>
          <div className="form-input mb-3">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="mb-3">
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {images.length
              ? `${images.length} Images Selected`
              : "Upload Images"}
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {images.length > 0 && (
            <div className="text-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`product_image_${index}`}
                  height={"200px"}
                  className="img img-responsive"
                  style={{ marginRight: "10px" }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="write a name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            style={{ outline: "none" }}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            value={description}
            placeholder="write a description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={price}
            placeholder="write a Price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={quantity}
            placeholder="write a quantity"
            className="form-control"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Select
            bordered={false}
            placeholder="Select Shipping "
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setShipping(value);
            }}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        {/* Show/hide weight option */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={showWeight}
              onChange={(e) => setShowWeight(e.target.checked)}
            />{" "}
            Show Weight
          </label>
          {showWeight && (
            <input
              type="text"
              placeholder="Weight Unit (e.g., kg)"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            />
          )}
        </div>

        {/* Show/hide sizes option */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={showSizes}
              onChange={(e) => setShowSizes(e.target.checked)}
            />{" "}
            Show Sizes
          </label>
          {showSizes && (
            <div>
              <label>
                <input
                  type="checkbox"
                  value="S"
                  onChange={handleSizeSelection}
                />{" "}
                S
              </label>
              <label>
                <input
                  type="checkbox"
                  value="M"
                  onChange={handleSizeSelection}
                />{" "}
                M
              </label>
              <label>
                <input
                  type="checkbox"
                  value="L"
                  onChange={handleSizeSelection}
                />{" "}
                L
              </label>
              <label>
                <input
                  type="checkbox"
                  value="XL"
                  onChange={handleSizeSelection}
                />{" "}
                XL
              </label>
              <label>
                <input
                  type="checkbox"
                  value="XXL"
                  onChange={handleSizeSelection}
                />{" "}
                XXL
              </label>
            </div>
          )}
        </div>
        <div className="mb-3 w-100">
          <button className="btn btn-secondary" onClick={handleCreate}>
            CREATE PRODUCT
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
