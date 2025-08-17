import React from 'react'
import './CreditItem.scss';
import ziraat from '../../Assets/ziraat.png';


export const CredirItem = (props) => {
    const {cartNumber,expirtDate, onSelect, isSelected,onDelete} = props;
  return (
    <div className="add-cart-selectors">
         <input type="checkbox" checked={isSelected} onChange={onSelect} />
             <div className="cart-item">
                <img src={ziraat} alt="" />
             <div className="add-cart-selector">
              <p>{cartNumber}</p>
                <p>{expirtDate}</p>
             </div>
             </div>
             <i onClick={onDelete} className="fa-solid fa-trash trash"></i>
           </div>
  )
}
