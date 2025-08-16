import React, { useContext } from "react";
import "./purchase.scss";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Purchase = () => {
  const { all_products, cartItems, selectedItems, totalAmount } =
    useContext(ShopContext);

  return (
    <div className="purchase-container">
      <div className="purchase-title">
        <h3>Products in My Cart</h3>
        <div className="purchase-total">
          <div className="purchase-total-item">
            <p>Total</p>
            <p>${totalAmount()}</p>
          </div>
        </div>
      </div>

      <div className="purchase-product">
        {all_products.map((e) => {
          if (selectedItems[String(e.id)] > 0) {
            return (
              <div key={e.id}>
                <Link  to={`/product/${e.id}`} ><img src={e.images} alt="" className="purchase-product-icon" /></Link>
               <div className="price">
                 <p>${e.new_price * cartItems[e.id]}</p>
                <p>({cartItems[e.id]})</p>
               </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
