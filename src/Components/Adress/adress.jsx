import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adress.scss";
import { AdresForm } from "./AdresForm/AdresForm";
import { Delivery } from "./Delivery/Delivery";
import Modal from "../Adress/model/model"; // az sonra oluşturacağız

export const Adress = ({onCheckAddress}) => {
  const [showModal, setShowModal] = useState(false);
  const [new_adress, setNew_adress] = useState(null);
  const [cartModel, setCartModel] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/adress", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        const lastAddress = response.data[response.data.length - 1];
        console.log("Son adres:", lastAddress);
        setNew_adress(lastAddress);

         if (onCheckAddress) {
          onCheckAddress(!!lastAddress);
        }
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
         if (onCheckAddress) {
          onCheckAddress(false);
        }
      });
  }, []);

  const handleAddressSelect = (selectedAddress) => {
    if (selectedAddress.length > 0) {
    const last = setNew_adress(selectedAddress[selectedAddress.length - 1]);
      setNew_adress(last);
      onCheckAddress && onCheckAddress(true);
  } else {
    setNew_adress(null); // Liste boşsa "Address not found" yaz
    onCheckAddress && onCheckAddress(false);
  }
  };

  return (
    <div className="payment-adress">
      <div className="adress-title">
        <h3>Delivery Address</h3>
      </div>

      <div className="adress-option-text-container">
        <div className="adress-text">
          <p>Delivery Address</p>
          <button onClick={() => setShowModal(true)}>
            + Add
          </button>
        </div>

        <div className="add-adress-selector">
          {new_adress ? (
            <p>
              {new_adress.name} {new_adress.surname}/{new_adress.number}/
              {new_adress.city}/{new_adress.adress}
            </p>
          ) : (
            <p>Address not found</p>
          )}
          <i
            onClick={() => setCartModel(true)}
            className="fa-solid fa-arrow-right"
          ></i>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Adres Ekle</h2>
          <AdresForm />
        </Modal>
      )}
      {cartModel && (
        <Modal onClose={() => setCartModel(false)}>
          <h2>Delivery Address</h2>
          <Delivery
            onAddressSelect={handleAddressSelect}
            onClose={() => setCartModel(false)}
          />
        </Modal>
      )}
    </div>
  );
};
