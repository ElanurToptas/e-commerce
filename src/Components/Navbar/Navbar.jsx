import React, { useContext, useState, useRef,useEffect } from "react";
import { Link } from "react-router-dom"; // Sayfa değişmeden içerik değişir.
import "./Navbar.scss";

import logo from "../Assets/Frontend_Assets/logo.png";
import cart_icon from "../Assets/Frontend_Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png'

export const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const {totalCart} = useContext(ShopContext)
  const menuRef = useRef();

  // Kullanıcı adını localStorage'dan al
  const [userName, setUserName] = useState(localStorage.getItem("user-name") || "");

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user-name") setUserName(e.newValue || "");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-active');
    e.target.classList.toggle('open');
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-name"); 
    setUserName("");
    window.location.replace("./");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setmenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setmenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
         {localStorage.getItem("auth-token") && userName && (
          <span style={{ marginRight: "12px" }}>
            {"Welcome "}{userName}
          </span>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{totalCart()}</div>
         {localStorage.getItem('auth-token')
        ?<button onClick={handleLogout}>Logout</button>
        :<Link to="/login">
          <button>Login</button>
        </Link> }
      </div>
    </div>
  );
};
