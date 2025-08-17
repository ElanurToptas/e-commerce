import React,{useState, useEffect} from 'react'
import axios from "axios";
import './pay.scss'
import Modal from '../Adress/model/model';
import { CartForm } from './CartForm/CartForm';
import ziraat from '../Assets/ziraat.png';
export const Pay = () => {

  const [showModal, setShowModal] = useState(false);
  const [new_cart, setNew_cart] = useState(null);

    useEffect(() => {
    axios
      .get("http://localhost:4000/paymentt", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        const lastCart = response.data[response.data.length - 1];
        console.log("Son adres:", lastCart);
        setNew_cart(lastCart);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  return (
    <div className='pay-container'>
      <div className="pay-title">
        <h3>Payment Options</h3>
      </div>
      <div className="pay-text-container">
        <div className="pay-text">
          <h3>Payment Options</h3>
          <button onClick={() => setShowModal(true)}>+ Add Cart</button>
        </div>
        <div className="add-cart-selectors">
          <img src={ziraat} alt="" />
          <div className="add-cart-selector">
            {new_cart ? (
            <p>
              {new_cart.cartNumber}-{new_cart.expiryDate}
            </p>
          ) : (
            <p>Kayıtlı Kart bulunamadı</p>
          )}
          <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Add Cart</h2>
         <CartForm 
         />
        </Modal>
      )}
    </div>
  );
};

