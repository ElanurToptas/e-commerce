import React, { useState } from "react";
import "./adress.scss";
import {AdresForm} from './AdresForm/AdresForm'
import Modal from "../Adress/model/model"; // az sonra oluşturacağız


export const Adress = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="payment-adress">
      <div className="adress-title">
        <h3>Teslimat Adresi</h3>
      </div>

      <div className="adress-option-text-container">
        <div className="adress-text">
          <p>Teslimat Adresi</p>
          <button onClick={() => setShowModal(true)}>
            + Yeni Adres Ekle/Değiştir
          </button>
        </div>

        <div className="add-adress-selector">
          <p>gfd</p>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Adres Ekle</h2>
          <AdresForm />
        </Modal>
      )}
    </div>
  );
};
