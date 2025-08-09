import React, { createContext } from "react";
import { useState } from "react";
import all_products from "../Components/Assets/Frontend_Assets/all_product";

export const ShopContext = createContext(null); // ShopContext ile global state oluşturuyoruz.


const getDefaultCart = () => {
  let cart = {}; // cart her ürünün sepette kaç tane olduğunu tutar.
  let selected = {};
  all_products.forEach((product) => {
    cart[product.id] = 0; // Sepetteki adet
    selected[product.id] = false; // Seçili durumu
  });
  return { cart, selected };
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart().cart);
  const [selectedItems, setSelectedItems] = useState(getDefaultCart().selected);

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
