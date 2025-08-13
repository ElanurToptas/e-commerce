import React from "react";
import "./Item.scss";
import { Link } from "react-router-dom";
export const Item = (props) => {

  const {id,name,images,new_price,old_price} = props;
  
  return (
    <div className="item">
      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0,0)}><img  src={images} alt=""/></Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">${new_price}</div>
        <div className="item-prices-old">${old_price}</div>
      </div>
    </div>
  );
};
