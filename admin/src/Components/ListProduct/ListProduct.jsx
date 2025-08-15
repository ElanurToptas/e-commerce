import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListProduct.css";
import cross_icon from '../../Assets/Admin_Assets/cross_icon.png'

export const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const axiosInfo = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/allproducts");
    setAllproducts(data);
  } catch (err) {
    console.error("Ürünleri çekerken hata:", err);
  }
};

// Component yüklendiğinde bir kere ürünleri getir
  useEffect(() => {
    axiosInfo();
  },[])

  const remove_product = async (id) => {
     try {
    const { data } = await axios.post(
      "http://localhost:4000/removeproduct",
     { id: id}
    )
    await axiosInfo();
    if (data.success) {
      console.log(`${data.name ?? id} silindi`);
    } else {
      console.log("Silinemedi");
    }
  } catch (e) {
    console.error("Silme hatası:", e);
  }
  }
  
    const handleAddToCart = (id, name) => {
       remove_product(id);
      setShowCard(true);
      setAlertMessage(`${name} sepetten silindi`);
      setTimeout(() => {
        setShowCard(false);
        setAlertMessage("");
      }, 2000);
    };

 return (
    <div className="list-product">
      {showCard && (
        <div className="cart-message">{alertMessage}</div>
      )}

      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <div
            key={product.id}
            className="listproduct-format-main listproduct-format"
          >
            <img
              className="listproduct-product-icon"
              src={product.images}
              alt=""
            />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              onClick={() => handleAddToCart(product.id, product.name)}
              className="listproduct-remove-icon"
              src={cross_icon}
              alt=""
            />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
