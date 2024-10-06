import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Pagenotfound from "./Pages/Pagenotfound";
import Dashboard from "./Pages/user/Dashboard";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPass from "./Pages/auth/ForgotPass";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminRoute from "./Components/Routes/adminRout";
import CreateCategories from "./Pages/Admin/CreateCategories";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Allusers from "./Pages/Admin/Allusers";
import Profile from "./Pages/user/Profile";
import Orders from "./Pages/user/Orders";
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import AllCategory from "./Pages/AllCategory";
import UserMenu from "./Pages/UserMenu";
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Category from "./Pages/user/Category";
import CartPage from "./Pages/CartPage";
import UpdateAddress from "./Pages/UpdateAddress";
import Payment from "./Pages/Payment";
import AdminOrder from "./Pages/Admin/AdminOrder";
import MyStyle from "./Pages/MyStyle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vid" element={<MyStyle />} />

        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/category/:slug" element={<Category />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/update-address/" element={<UpdateAddress />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/search" element={<Search />} />
        <Route path="/category" element={<AllCategory />} />

        <Route path="/user-menu" element={<UserMenu />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/orders" element={<AdminOrder />} />
          <Route path="admin/users" element={<Allusers />} />

          <Route
            path="admin/create-categories"
            element={<CreateCategories />}
          />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />

          <Route path="admin/users" element={<Allusers />} />
        </Route>

        <Route path="/forgot-password/*" element={<ForgotPass />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
