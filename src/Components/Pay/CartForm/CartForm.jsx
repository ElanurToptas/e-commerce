import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "./CartForm.scss";
const SignupSchema = Yup.object({
  cartNumber: Yup.string()
    .required("Cart is required")
    .min(16, "Cart number too short")
    .max(16, "Cart number too long"),

  expiryDate: Yup.string().required(" Expiry Date is required"),
  cvv: Yup.string()
    .min(3, "CVV number too short")
    .required("CVV Number is required"),
});

export const CartForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    cartNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
  };

  const registerCart = async () => {
     try {
      await SignupSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});

      const token = localStorage.getItem("auth-token");

      if (!token) {
        setErrors({ general: "Lütfen önce giriş yapınız." });
        return;
      }

      const { data } = await axios.post(
        "http://localhost:4000/paymentcart",
        formData,
        { headers: { accept: "application/json", "auth-token": token } }
      );

      if (data.success) {
        window.location.replace("/payment");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((e) => {
          if (!fieldErrors[e.path]) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      } else if (err.response?.data?.errors) {
        setErrors({ general: err.response.data.errors });
      }
  };}

  const handleSubmit = (e) => {
    e.preventDefault();
    registerCart();
  };

  return (
    <form onSubmit={handleSubmit}>
       {errors.general && <div style={{ color: "red" }}>{errors.general}</div>}
      <div className="add-cart-number">
        <label>
          Cart Number
          <input
            name="cartNumber"
            value={formData.cartNumber}
            onChange={changeHandler}
            type="text"
            placeholder="Enter Your Cart Number"
          />
          {errors.cartNumber && (
            <small style={{ color: "#da3b0bff" }}>{errors.cartNumber}</small>
          )}
        </label>
      </div>
      <div className="add-cart-date-cvv">
        <label>
          Expiry Date
          <input
            name="expiryDate"
            value={formData.expiryDate}
            onChange={changeHandler}
            type="text"
            placeholder="MM/YY"
          />
           {errors.expiryDate && (
            <small style={{ color: "#da3b0bff" }}>{errors.expiryDate}</small>
          )}
        </label>

        <label>
          CVV
          <input
            name="cvv"
            value={formData.cvv}
            onChange={changeHandler}
            type="text"
            placeholder="Enter CVV"
          />
           {errors.cvv && (
            <small style={{ color: "#da3b0bff" }}>{errors.cvv}</small>
          )}
        </label>
      </div>
      <div className="btn">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};
