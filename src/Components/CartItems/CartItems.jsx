import React, { useContext } from "react";
import "./CartItems.scss";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/Frontend_Assets/cart_cross_icon.png";

export const CartItems = () => {
  const {
    all_products,
    cartItems,
    removeFromCart,
    addToCart,
    deleteFromCart,
    selectedItems,
    toggleSelectItem,
    totalAmount,
  } = useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartitems-format-main-title cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          // sepette ürün varsa
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <input
                  type="checkbox"
                  checked={selectedItems[e.id] || false}
                  onChange={() => toggleSelectItem(e.id)}
                />
                <img src={e.images} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <div className="buttons">
                  <button
                    className="remove"
                    onClick={() => removeFromCart(e.id)}
                  >
                    -
                  </button>
                  <button className="cartitems-quantity">
                    {cartItems[e.id]}
                  </button>
                  <button className="add" onClick={() => addToCart(e.id)}>
                    +
                  </button>
                </div>

                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartItems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    deleteFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cartitems-total-item">
              <p>Subtatal</p>
              <p>${totalAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shippinf Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
