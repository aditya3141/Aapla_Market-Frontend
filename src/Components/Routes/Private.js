import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "https://aapla-market-backend.vercel.app/api/v1/auth/user-auth"
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setOk(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/login/success",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (auth?.token) {
      authCheck();
      fetchData();
    }
  }, [auth?.token]);

  return ok ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Outlet />
  );
}
