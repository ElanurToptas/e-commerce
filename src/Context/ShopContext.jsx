import React, { createContext } from "react";
import { useState } from "react";
import all_products from "../Components/Assets/Frontend_Assets/all_product";

export const ShopContext = createContext(null); // ShopContext ile global state oluşturuyoruz.

const getDefaultCart = () => {
    let cart = {}; // cart her ürünün sepette kaç tane olduğunu tutar.
    for (let index = 0; index < all_products.length + 1; index++) {
      cart[index] = 0;
//       const pid = all_product[index].id;
//   cart[pid] = 0;
    }
    return cart;
  };

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
  
  // State güncellemem eski state değerine bağlıysa bu yapı kullanılır. callback function
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const deleteFromCart = (itemId) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: 0
  }));
};

const totalAmount = () =>{
  let total = 0;
  for(const item in cartItems){
    if(cartItems[item]>0)
    {
      let itemInfo = all_products.find((p) => p.id === Number(item));
      total += cartItems[item] * itemInfo.new_price;
    }
  };
  return total;
}

const totalCart = () => {
  let totalItem = 0;
  for(const item in cartItems){
    if(cartItems[item] > 0)
    {
      totalItem += cartItems[item];
    }
  }
  return totalItem;
}


  const contexValue = {all_products,cartItems,addToCart,removeFromCart,deleteFromCart,totalAmount,totalCart};

  return (
    <ShopContext.Provider value={contexValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider; // ShopContextProvider bileşenini dışa aktarıyoruz.
