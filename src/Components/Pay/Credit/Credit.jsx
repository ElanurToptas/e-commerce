import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreditItem } from "../CreditItem/CreditItem";
import { CartForm } from "../CartForm/CartForm";
export const Credit = ({ onCartSelect, onClose }) => {
  const [cartList, setCartList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/paymentt", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log("Tüm Kredi Kartları:", response.data);
        setCartList(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  if (showForm) {
    return <CartForm />;
  }

  // for checkbox
  const handleChoose = () => {
    if (selectedIndex !== null) {
      onCartSelect(cartList);
      onClose();
    }
  };

  const remove_adress = (id) => {
    axios
      .post(
        "http://localhost:4000/removecart",
        { id },
        {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        }
      )
      .then((res) => {
        if (res.data.success) {
          const updatedList = cartList.filter((adres) => adres._id !== id);
          setCartList(updatedList);

          if (selectedIndex !== null && cartList[selectedIndex]?._id === id) {
            setSelectedIndex(null);
          }

          // Ana component'e bildir
          onCartSelect(updatedList);
        }
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
      });
  };

  return (
    <div>
      <div className="credit-cartItem">
        {cartList.length > 0 ? (
            cartList.map((item, i) => (
          <CreditItem
            key={i}
            cartNumber={item.cartNumber}
            expirtDate={item.expiryDate}
            isSelected={selectedIndex === i}
            onSelect={() => {
              setSelectedIndex(i);
            }}
            onDelete={() => remove_adress(item._id)}
          />
        ))
        ):(
           <p>Kayıtlı Kart bulunamadı</p> 
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
