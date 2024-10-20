import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://aapla-market-backend.vercel.app/api/v1/category/gets-category"
      );
      setCategories(data?.category);
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
