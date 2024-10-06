import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [values, setValues] = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results were found
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const keyword = e.target.value.toLowerCase();
    setValues({ ...values, keyword });

    if (keyword) {
      try {
        const { data } = await axios.get(
          `https://backend-market-1bby.onrender.com/api/v1/product/search/${keyword}`
        );
        const filteredSuggestions = data
          .filter((product) => product.name.toLowerCase().startsWith(keyword))
          .slice(0, 10); // Limit suggestions to 10 items
        setSuggestions(filteredSuggestions);
        setNoResults(filteredSuggestions.length === 0); // Update noResults state
      } catch (error) {
        console.error("Error fetching search suggestions", error);
      }
    } else {
      setSuggestions([]);
      setNoResults(false); // Reset noResults state
    }
  };

  const performSearch = async (keyword) => {
    try {
      const { data } = await axios.get(`/api/v1/product/search/${keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.error("Error executing search", error);
    }
  };

  const handleSelect = async (product) => {
    setValues({ ...values, keyword: product.name });
    setSuggestions([]);
    await performSearch(product.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await performSearch(values.keyword);
  };

  return (
    <div className="">
      <form
        className="theme-form search-head"
        onSubmit={handleSubmit}
        target="_blank"
      >
        <div className="form-group">
          <div className="form-input">
            <input
              type="text"
              className="form-control search"
              id="inputusername"
              placeholder="Search here..."
              value={values.keyword}
              onChange={handleChange}
              autoComplete="off"
            />

            <i className="iconsax search-icon" data-icon="search-normal-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                  fill="#292D32"
                ></path>
                <path
                  d="M21.9995 22.7514C21.8095 22.7514 21.6195 22.6814 21.4695 22.5314L19.4695 20.5314C19.1795 20.2414 19.1795 19.7614 19.4695 19.4714C19.7595 19.1814 20.2395 19.1814 20.5295 19.4714L22.5295 21.4714C22.8195 21.7614 22.8195 22.2414 22.5295 22.5314C22.3795 22.6814 22.1895 22.7514 21.9995 22.7514Z"
                  fill="#292D32"
                ></path>
              </svg>
            </i>
          </div>
        </div>
        {suggestions.length > 0 ? (
          <div className="w-100" style={{ overflowX: "hidden" }}>
            <ul className="search-suggestions">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className="suggestion-item"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          noResults && (
            <div
              className="search-suggestions w-100"
              style={{ overflowX: "hidden" }}
            >
              <p className="suggestion-item">No results found</p>
            </div>
          )
        )}
      </form>
    </div>
  );
};

export default SearchBar;
