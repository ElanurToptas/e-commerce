import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pay.scss";
import Modal from "../Adress/model/model";
import { CartForm } from "./CartForm/CartForm";
import { Credit } from "./Credit/Credit";
import ziraat from "../Assets/ziraat.png";
export const Pay = () => {
  const [showModal, setShowModal] = useState(false);
  const [new_cart, setNew_cart] = useState(null);
  const [cartModel, setCartModel] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/paymentt", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        const lastCart = response.data[response.data.length - 1];
        console.log("Son Cart:", lastCart);
        setNew_cart(lastCart);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  const handleCartSelect = (selectedCart) => {
    if (selectedCart.length > 0) {
      setNew_cart(selectedCart[selectedCart.length - 1]);
    } else {
      setNew_cart(null);
    }
  };

  return (
    <div className="pay-container">
      <div className="pay-title">
        <h3>Payment Options</h3>
      </div>
      <div className="pay-text-container">
        <div className="pay-text">
          <h3>Payment Options</h3>
          <button onClick={() => setShowModal(true)}>+ Add Cart</button>
        </div>
        <div className="add-cart-selectors">
          {new_cart?.cartNumber?.trim() && (
            <img src={ziraat} alt="Kart Görseli" />
          )}
          <div className="add-cart-selector">
            {new_cart ? (
              <p>
                {new_cart.cartNumber}-{new_cart.expiryDate}
              </p>
            ) : (
              <p>Kayıtlı Kart bulunamadı</p>
            )}
            <i
              onClick={() => setCartModel(true)}
              className="fa-solid fa-arrow-right"
            ></i>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Add Cart</h2>
          <CartForm />
        </Modal>
      )}

      {cartModel && (
        <Modal onClose={() => setCartModel(false)}>
          <h2>Delivery Address</h2>
          <Credit
            onCartSelect={handleCartSelect}
            onClose={() => setCartModel(false)}
          />
        </Modal>
      )}
    </div>
  );
};
