import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Delivery.scss";
import { AdresItem } from "../AdresItem/AdresItem";
import { AdresForm } from "../AdresForm/AdresForm";
export const Delivery = ({ onAddressSelect, onClose }) => {
  const [adresList, setAdresList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/adress",
        {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
      )
      .then((response) => {
        console.log("Tüm adresler:", response.data);
        setAdresList(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  if (showForm) {
    return <AdresForm />;
  }

  // for checkbox
  const handleChoose = () => {
    if (selectedIndex !== null) {
      const selectedAddress = adresList[selectedIndex];
      onAddressSelect(selectedAddress);
      onClose();
    }
  };

  const remove_adress = (id) => {
    axios
      .post("http://localhost:4000/removeaddress", { id })
      .then((res) => {
        if (res.data.success) {
          setAdresList((prevList) =>
            prevList.filter((adres) => adres._id !== id)
          );
        }
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
      });
  };

  return (
    <div>
      <div className="delivery-cartItem">
        {adresList.length > 0 ? (
          adresList.map((item, i) => (
            <AdresItem
              key={i}
              name={item.name}
              surname={item.surname}
              number={item.number}
              city={item.city}
              adress={item.adress}
              isSelected={selectedIndex === i}
              onSelect={() => setSelectedIndex(i)}
              onDelete={() => remove_adress(item._id)}
            />
          ))
        ) : (
          <p>Adres bulunamadı</p>
        )}
        <div className="new-adres-btn">
          <button className="new" onClick={() => setShowForm(true)}>
            + New Adress
          </button>
          <button className="choose" onClick={handleChoose}>
            Choose Address
          </button>
        </div>
      </div>
    </div>
  );
};
