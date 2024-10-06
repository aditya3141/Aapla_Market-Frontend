import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/AllLayout";
import Adminmenu from "../../Components/Layout/Adminmenu";
import { useAuth } from "../../context/auth";
import { CSVLink } from "react-csv";

import axios from "axios";
import { toast } from "react-hot-toast";

const Allusers = () => {
  const [allusers, setallusers] = useState([]);
  const [auth, setAuth] = useAuth();

  //get all products
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-Userss");
      setallusers(data.result);
      setallusers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-Userss/${pId}`);
      if (data.success) {
        toast.success("Users Delete Successfully");
        getAllUsers();
      } else {
      }
    } catch (error) {}
  };
  return (
    <Layout>
      <div className="col-12">
        <Adminmenu />
      </div>

      <h2>Users</h2>
      <div className="border shadow">
        <CSVLink data={allusers} onClick={() => {}}>
          Export Data
        </CSVLink>
        <table className="table">
          <thead>
            <tr className="table-U">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col"> Phone</th>
              <th scope="col"> Delete</th>
            </tr>
          </thead>
          {allusers?.map((u, i) => {
            return (
              <tbody className="fs-7" key={u._id}>
                <tr className="table-U">
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      className="p-2 btn-danger"
                      onClick={() => {
                        handleDelete(u._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </Layout>
  );
};

export default Allusers;
