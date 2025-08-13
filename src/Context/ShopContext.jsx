import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null); // ShopContext ile global state oluşturuyoruz.

const getDefaultCart = () => {
  let cart = {}; // cart her ürünün sepette kaç tane olduğunu tutar.
  let selected = {};

  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0; // Sepetteki adet
    selected[index] = false; // Seçili durumu
  }
  return { cart, selected };
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart().cart);
  const [selectedItems, setSelectedItems] = useState(getDefaultCart().selected);

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
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: true, // yeni ekleneni seçili yap
    }));
    console.log(cartItems);
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

  const totalCart = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

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
