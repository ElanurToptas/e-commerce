import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null); // ShopContext ile global state oluşturuyoruz.

// const getDefaultCart = () => {
//   let cart = {}; // cart her ürünün sepette kaç tane olduğunu tutar.
//   let selected = {};

//   for (let index = 0; index < 300 + 1; index++) {
//     cart[index] = 0; // Sepetteki adet
//     selected[index] = false; // Seçili durumu
//   }
//   return { cart, selected };
// };

const ShopContextProvider = (props) => {
  const [all_products, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/allproducts")
      .then((response) => {
        setAll_products(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  // State güncellemem eski state değerine bağlıysa bu yapı kullanılır. callback function
  const addToCart = (itemId) => {
    setCartItems((prev) => {
    const key = String(itemId);                  // anahtarı netleştir
    const current = Number(prev[key] ?? 0);      // undefined -> 0, "0" -> 0
    const next = current + 1;
    // console.log(key, current, "->", next);
    return { ...prev, [key]: next };
  });

  setSelectedItems((prev) => {
    const key = String(itemId);
    return { ...prev, [key]: true };
  });

    // if (localStorage.getItem("auth-token")) {
    //   axios
    //     .post(
    //       "http://localhost:4000/addtocart",
    //       { itemId },
    //       {
    //         headers: {
    //           Accept: "application/json",
    //           "auth-token": localStorage.getItem("auth-token"),
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Add to cart error:", error);
    //     });
    // }
    // if (localStorage.getItem("auth-token")) {
    //   fetch("http://localhost:4000/addtocart", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/form-data",
    //       "auth-token": `${localStorage.getItem("auth-token")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ itemId: itemId }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    // }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  // for checkbox
  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const totalAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0 && selectedItems[itemId]) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          total += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    return total;
  };

  const totalCart = () =>
  Object.values(cartItems).reduce((sum, qty) => sum + Number(qty || 0), 0);

  const contexValue = {
    all_products,
    cartItems,
    selectedItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    totalAmount,
    toggleSelectItem,
    totalCart,
  };

  return (
    <ShopContext.Provider value={contexValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider; // ShopContextProvider bileşenini dışa aktarıyoruz.
