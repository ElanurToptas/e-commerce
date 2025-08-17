import React,{useState} from 'react'
import './pay.scss'
import Modal from '../Adress/model/model';
import { CartForm } from './CartForm/CartForm';
export const Pay = () => {

  const [showModal, setShowModal] = useState(false);

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
        <div className="add-cart-selector">
          <p>Kayıtlı kart yok</p>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Add Cart</h2>
         <CartForm />
        </Modal>
      )}
    </div>
  );
};

