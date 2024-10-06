import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  const darkSwitch = document.querySelector("#dark-switch");
  const bodyDom = document.querySelector("body");
  const initialDarkCheck = localStorage.getItem("layout_version");
  if (darkSwitch) {
    if (initialDarkCheck === "dark") darkSwitch.checked = true;
  }
  darkSwitch?.addEventListener("change", (e) => {
    const checkbox = e.target;
    if (checkbox.checked) {
      bodyDom.classList.add("dark");
      localStorage.setItem("layout_version", "dark");
    }

    if (!checkbox.checked) {
      bodyDom.classList.remove("dark");
      localStorage.removeItem("layout_version");
    }
  });

  if (localStorage.getItem("layout_version") === "dark") {
    bodyDom.classList.add("dark");
  }

  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content="{description}" />
        <meta name="keywords" content="{keywords}" />
        <meta name="author" content="{author}" />
        <title>{title}</title>
      </Helmet>
      <Header />

      <main>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Aapla Market App - Shop",
  description:
    "This app is made up of villages in Kotoli area and is a shopping app that provides home delivery and services. If Girayak is happy then we have applied the principle of happiness in this app",
  author: "Aditya Gaikwad",
  keywords: "shop, app, aapla market, market, apla market",
};

export default Layout;
