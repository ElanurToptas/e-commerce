import React from "react";
import "./adress.scss";

export const Adress = () => {
  return (
    <div className="payment-adress">
      <div className="adress-title">
        <h3>Teslimat Adresi</h3>
      </div>
      <div className="adress-option-text-container">
        <div className="adress-text">
        <p>Teslimat Adresi</p>
        <button>+ Yeni Adres Ekle</button>
      </div>
     <div className="add-adress-selector">
        <p>gfd</p>
        <i class="fa-solid fa-arrow-right"></i>
     </div>
      </div>
    </div>
  );
};
