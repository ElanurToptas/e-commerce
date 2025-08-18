import React, { useState } from "react";
import "../Pages/SCSS/payment.scss";
import { Purchase } from "../Components/Purchase/purchase";
import { Adress } from "../Components/Adress/adress";
import { Pay } from "../Components/Pay/pay";
import { Contracts } from "../Components/Contracts/Contracts";

export const Payment = () => {
  const [orderCart, setOrderCart] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [hasCard, setHasCard] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);

  const showCart = () => {
    if (isCheckboxChecked) {
      setOrderCart(true);
      setTimeout(() => setOrderCart(false), 2000); // bildirimi 2 saniye sonra kapat
    }
  };
  return (
    <div>
      <Purchase />
      <Adress onCheckAddress={setHasAddress}/>
      <Pay onCardCheck={setHasCard}/>
      <Contracts onCheckChange={setIsCheckboxChecked} />
      <button
        onClick={showCart}
        disabled={!isCheckboxChecked || !hasCard || !hasAddress}
        className="order"
      >
        Order
      </button>
      {orderCart && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "80px",
            backgroundColor: isCheckboxChecked ? "#4caf50" : "#ccc",
            color: " white",
            padding: "12px 30px",
            borderRadius: " 8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            animation: "fadeInOut 2s ease forwards",
          }}
        >
          <p>Receive your order</p>
        </div>
      )}
    </div>
  );
};
