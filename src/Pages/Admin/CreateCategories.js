import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/AllLayout";
import Adminmenu from "../../Components/Layout/Adminmenu";
import Toast, { toast } from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";

const CreateCategories = () => {
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedename, setUpdateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name };

    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success) {
        toast.success(`${name} is Created successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong in input form");
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/gets-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something Went Wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedename }
      );
      if (data.success) {
        toast.success(`${updatedename} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong ");
    }
  };

  // delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout>
      <div className="col-12">
        <Adminmenu />
        <section className="section-b-space p-5">
          <div className="custom-container">
            <form className="address-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <div className="form-input mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter new Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <div className="container col-10 ">
        <h2>Categories</h2>
        <>
          <table className="table ">
            <thead>
              <tr className="row">
                <th className="col-6">Name</th>
                <th className="col-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((c) => (
                <>
                  <tr key={c._id}>
                    <td className="" key={c._id}>
                      <h3 className="mt-5">{c.name}</h3>
                    </td>
                    <td className="d-flex align-items-center justify-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setVisible(true);
                          setUpdateName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <form className="address-form" onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <div className="form-input mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter updated Category"
                    value={updatedename}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
                  Update
                </button>
              </div>
            </form>
          </Modal>
        </>
      </div>
    </Layout>
  );
};

export default CreateCategories;
