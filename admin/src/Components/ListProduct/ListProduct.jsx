import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListProduct.css";
import cross_icon from '../../Assets/Admin_Assets/cross_icon.png'

export const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

 const fetchInfo = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/allproducts");
    setAllproducts(data);
  } catch (err) {
    console.error("Ürünleri çekerken hata:", err);
  }
};

  useEffect(() => {
    fetchInfo();
  },[])

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index) =>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img  className ="listproduct-product-icon" src={product.images} alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img className="listproduct-remove-icon" src={cross_icon} alt="" />
          </div>
          <hr />
          </> 
        })}
      </div>
    </div>
  );
};
