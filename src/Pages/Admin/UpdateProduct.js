import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/AllLayout";
import Adminmenu from "../../Components/Layout/Adminmenu";
import Toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [images, setImages] = useState([]);
  const [id, setId] = useState("");

  // Get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setImages(data.product.images || []);
    } catch (error) {
      Toast.error("Something went wrong while fetching product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/gets-category");
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

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo);
      }
      images.forEach((image) => {
        if (image instanceof File) {
          productData.append("images", image);
        }
      });
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        Toast.error(data?.message);
      } else {
        Toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      Toast.error("Something went wrong");
    }
  };

  // Delete a product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/product-delete/${id}`
      );
      Toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      Toast.error("Something went wrong");
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
          <label className="form-label">Update Product</label>
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
              value={category}
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
          {photo ? (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          ) : (
            <div className="text-center">
              <img
                src={`/api/v1/product/product-photo/${id}`}
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
              {images.map((image, index) => {
                const imageUrl =
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : `http://localhost:9000/${image}`;
                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`product_image_${index}`}
                    height={"200px"}
                    className="img img-responsive"
                    style={{ marginRight: "10px" }}
                  />
                );
              })}
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
            placeholder="Select Shipping"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setShipping(value);
            }}
            value={shipping}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <div className="mb-3 w-100">
          <button className="btn btn-secondary" onClick={handleUpdate}>
            Update Product
          </button>
          <button className="btn btn-danger ms-2" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
