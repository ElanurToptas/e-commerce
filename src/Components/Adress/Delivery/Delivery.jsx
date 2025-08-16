import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Delivery.scss";
import { AdresItem } from "../AdresItem/AdresItem";
import { AdresForm } from "../AdresForm/AdresForm";
export const Delivery = ({ onAddressSelect, onClose }) => {
  const [new_adress, setNew_adress] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/adress")
      .then((response) => {
        console.log("Tüm adresler:", response.data);
        setNew_adress(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  if (showForm) {
    return <AdresForm />;
  }

  const handleChoose = () => {
    if (selectedIndex !== null) {
      const selectedAddress = new_adress[selectedIndex];
      onAddressSelect(selectedAddress); 
      onClose(); 
    }
  };

  return (
    <div>
      <div className="delivery-cartItem">
        {new_adress.length > 0 ? (
          new_adress.map((item, i) => (
            <AdresItem
              key={i}
              name={item.name}
              surname={item.surname}
              number={item.number}
              city={item.city}
              adress={item.adress}
              isSelected={selectedIndex === i}
              onSelect={() => setSelectedIndex(i)}
            />
          ))
        ) : (
          <p>Adres bulunamadı</p>
        )}
        <div className="new-adres-btn">
          <button className="new" onClick={() => setShowForm(true)}>
            + New Adress
          </button>
          <button className="choose" onClick={handleChoose}>Choose Address</button>
        </div>
      </div>
    </div>
  );
};
