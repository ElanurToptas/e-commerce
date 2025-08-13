import React,{useState,useEffect} from "react";
import "./RelatedProducts.scss";
import axios from "axios"
import { Item } from "../Item/Item";

export const RelatedProducts = () => {

  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
     axios
      .get("http://localhost:4000/popularinwomen")
      .then((response) => {
        
        setrelatedProducts(response.data);
      })
      .catch((error) => {
        console.error("Veriler alınırken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {relatedProducts.map((item, i) => {
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
