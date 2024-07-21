import React, { useCallback, useContext, useState } from "react";
import "./navBar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out Successfully");
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="navBar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      {isHomePage && (
        <ul className="navbar-menu">
          <Link
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
            to={"/"}
          >
            home
          </Link>
          <a
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
            href="#explore-menu"
          >
            menu
          </a>
          <a
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
            href="#app-dowmnload"
          >
            mobile-app
          </a>
          <a
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
            href="#footer"
          >
            contact us
          </a>
        </ul>
      )}
      <div className="navbar-right">
        {/* For Future use */}
        {/* <img src={assets.search_icon} alt="" className="search" /> */}

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button className="sigin" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="nav-bar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/my-orders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
