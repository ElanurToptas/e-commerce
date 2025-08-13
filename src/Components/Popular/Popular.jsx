import React, { useState,useEffect } from "react";
import "./Popular.scss";
import axios from "axios"
import { Item } from "../Item/Item";

export const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:4000/popularinwomen")
      .then((response) => {
        
        setPopularProducts(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMAN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              images={item.images}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};
 