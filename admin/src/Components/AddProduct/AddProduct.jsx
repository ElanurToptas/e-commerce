import React, { useActionState, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import * as Yup from "yup";
import upload_area from "../../Assets/Admin_Assets/upload_area.svg";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  old_price: Yup.number()
    .transform((v, o) => (o === "" ? undefined : v))
    .required("Price is required")
    .typeError("Price must be a number")
    .positive("Price must be positive"),
  new_price: Yup.number()
    .transform((v, o) => (o === "" ? undefined : v))
    .required("Offer price is required")
    .typeError("Price must be a number")
    .positive("Price must be positive"),
  category: Yup.string().required("Please select a category"),
  image: Yup.mixed()
    .required("Product image is required")
    .test(
      "fileExists",
      "Product image is required",
      (value) => value && value instanceof File
    ),
});

export const AddProduct = () => {
  //  Yup hata mesajları
  const [errors, setErrors] = useState({});

  //  Submit öncesi doğrulama
  const handleSubmit = async () => {
    try {
      await ProductSchema.validate(
        { ...productDetails, image },
        { abortEarly: false }
      );
      setErrors({}); // doğrulama hatasızsa boş nesne
      await Add_Product();
    } catch (e) {
      const fieldErrors = {}; // Hata mesajlarını saklar
      if (e.inner?.length) {
        e.inner.forEach((err) => {
          if (!fieldErrors[err.path]) fieldErrors[err.path] = err.message;
        });
      } else {
        fieldErrors[e.path] = e.message;
      }
      setErrors(fieldErrors);
    }
  };

  const [image, setImage] = useState(false);
  const [mcart, setMcart] = useState(false);
  const [message, setMessage] = useState("");

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

  const showmcart = (msg) => {
    setMcart(true);
    setMessage(msg);
    setTimeout(() => setMcart(false), 2000);
  };

  const Add_Product = async () => {
    try {
      let product = productDetails;

      let formData = new FormData();
      formData.append("product", image);

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
        showmcart(data.success ? "Success" : "Failed");
        console.log(data);
      } else {
        showmcart("Failed");
      }
    } catch (error) {
      // Bağlantı hataları
      showmcart("Failed");
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
        {errors.name && (
          <small style={{ color: "red" }} className="error">
            {errors.name}
          </small>
        )}
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
          {errors.old_price && (
            <small style={{ color: "red" }} className="error">
              {errors.old_price}
            </small>
          )}
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
          {errors.new_price && (
            <small style={{ color: "red" }} className="error">
              {errors.new_price}
            </small>
          )}
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
        {errors.category && (
          <small style={{ color: "red" }} className="error">
            {errors.category}
          </small>
        )}
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            style={{ marginBottom: "22px" }}
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
        {errors.image && (
          <small
            style={{ color: "red", marginLeft:"-120px" }}
            className="error"
          >
            {errors.image}
          </small>
        )}
      </div>
      <button
        onClick={() => {
          handleSubmit();
        }}
        className="addproduct-btn"
      >
        Add
      </button>

      {mcart && (
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
