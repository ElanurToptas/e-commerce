import React, { useEffect, useState } from "react";
import "./NewCollections.scss";
import axios from "axios";
import { Item } from "../Item/Item";

export const NewCollections = () => {
  const [new_collections, setNew_collections] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:4000/newcollections")
      .then((response) => {
        
        setNew_collections(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTİONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
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
