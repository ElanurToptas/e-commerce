import React, { useState } from 'react'
import { Link } from 'react-router-dom'; // Sayfa değişmeden içerik değişir.
import './Navbar.scss'

import logo from '../Assets/Frontend_Assets/logo.png'
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'

export const Navbar = () => {

  const [menu,setmenu] = useState("shop");

  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={() => {setmenu("shop")}}><Link to='/'>Shop</Link>{menu==="shop" ? <hr/>:<></>}</li>
            <li onClick={() => {setmenu("mens")}}><Link to='/mens'>Men</Link>{menu==="mens" ? <hr/>:<></>}</li>
            <li onClick={() => {setmenu("womens")}}><Link to='/womens'>Women</Link>{menu==="womens" ? <hr/>:<></>}</li>
            <li onClick={() => {setmenu("kids")}}><Link to='/kids'>Kids</Link>{menu==="kids" ? <hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt=""/></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}
