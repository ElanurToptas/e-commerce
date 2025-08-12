import React, { useActionState, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import upload_area from "../../Assets/Admin_Assets/upload_area.svg";
export const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    images: "",
    category: "women",
    new_price: "",
    old_price: "",
    id: Date.now(),
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const [cart, setCart] = useState(false);
  const [message, setMessage] = useState("");

  const showCart = (msg) => {
    setCart(true);
    setMessage(msg);
    setTimeout(() => setCart(false), 2000);
  };

  const Add_Product = async () => {
    try {
      // let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append("product", image);

      // Axios ile upload isteği
      const { data: responseData } = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (responseData.success) {
        product.images = responseData.image_url;
        console.log(product);

        const { data } = await axios.post(
          "http://localhost:4000/addproduct",
          product
        );
        showCart(data.success ? "Success" : "Failed");
        console.log(data);
      } else {
        showCart("Failed");
      }
    } catch (error) {
      // Bağlantı hataları
      showCart("Failed");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          className="add-product-selector"
          name="category"
        >
          <option value="woman">Woman</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            className="addproduct-thumnail-img"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        Add
      </button>

      {cart && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "80px",
            background: message === "Success" ? "#4caf50" : "#F44336",
            color: " white",
            padding: "12px 30px",
            borderRadius: " 8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "14px",
            animation: "fadeInOut 2s ease forwards",
          }}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};
