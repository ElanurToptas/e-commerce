import React from "react";
import "./AdresItem.scss";
export const AdresItem = (props) => {
  const { name, surname, number, city, adress, onSelect, isSelected,onDelete } = props;

  return (
    <div className="item-adres">
      <input type="checkbox" checked={isSelected} onChange={onSelect} />
      <div className="adres-item">
        <div className="adres-item-header">
          <p>{city} /</p>
          <i className="fa-solid fa-user"></i>
          <p>{name}</p>
          <p>{surname} /</p>
          <i className="fa-solid fa-phone"></i>
          <p>{number}</p>
        </div>
        <div className="adres-item-content">
          <p>{adress}</p>
        </div>
      </div>
      <i onClick={onDelete} className="fa-solid fa-trash trash"></i>
    </div>
  );
};
