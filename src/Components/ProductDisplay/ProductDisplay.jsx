import React, { useContext } from "react";
import "./ProductDisplay.scss";
import start_icon from "../Assets/Frontend_Assets/star_icon.png";
import start_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = (props) => {

  const { product } = props;
  const {addToCart} = useContext(ShopContext)

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-start">
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description"> 
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, autem non. Laudantium voluptatem cumque incidunt ab iusto itaque ut nihil vero maxime iure. Architecto, reprehenderit quam debitis libero officiis vero!
        </div>
        <div className="productDisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
        <p className="productDisplay-right-category">
          <span>
            Category:
          </span>
          Women, T-Shirt, Crop Top
        </p>
        <p className="productDisplay-right-category">
          <span>
            Tags:
          </span>
          Moders, Latest
        </p>
      </div>
    </div>
  );
};
