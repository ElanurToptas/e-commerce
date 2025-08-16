import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "./AdresForm.scss";

const SignupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  number: Yup.string()
    .min(10, "Phone number too short")
    .required("Phone Number is required"),
  city: Yup.string().required("City is required"),
  adress: Yup.string().required("Adres is required"),
});

export const AdresForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    number: "",
    city: "",
    adress: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
  };

  const register = async () => {
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
        "http://localhost:4000/adresscart",
        formData,
        { headers: { accept: "application/json", "auth-token": token } }
      );

      if (data.success) {
        window.location.replace("/payment");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        // Yup alan hataları
        const fieldErrors = {};
        err.inner.forEach((e) => {
          if (!fieldErrors[e.path]) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      } else if (err.response?.data?.errors) {
        // Backend (HTTP 4xx/5xx) hatası
        setErrors({ general: err.response.data.errors });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div style={{ color: "red" }}>{errors.general}</div>}
      <div className="personal">
        <label>
          Name
          <input
            name="name"
            value={formData.name}
            onChange={changeHandler}
            type="text"
            placeholder="Enter Your Name"
          />
          {errors.name && (
            <small style={{ color: "#da3b0bff" }}>{errors.name}</small>
          )}
        </label>
        <label>
          Surname
          <input
            name="surname"
            value={formData.surname}
            onChange={changeHandler}
            type="text"
            placeholder="Enter Your Surname"
          />
          {errors.surname && (
            <small style={{ color: "#da3b0bff" }}>{errors.surname}</small>
          )}
        </label>
      </div>
      <div className="phone-city">
        <label>
          Phone Number
          <input
            name="number"
            value={formData.number}
            onChange={changeHandler}
            type="text"
            placeholder="0 (___) ___ __ __"
          />
          {errors.number && (
            <small style={{ color: "#da3b0bff" }}>{errors.number}</small>
          )}
        </label>
        <label>
          City
          <select name="city" value={formData.city} onChange={changeHandler}>
            <option value="">Select</option>
            <option value="Kars">Kars</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
          </select>
          {errors.city && (
            <small style={{ color: "#da3b0bff" }}>{errors.city}</small>
          )}
        </label>
      </div>
      <div className="adress">
        <label>
          Adress
          <input
            name="adress"
            value={formData.adress}
            onChange={changeHandler}
            type="text"
            placeholder="Enter Your Address"
          />
          {errors.adress && (
            <small style={{ color: "#da3b0bff" }}>{errors.adress}</small>
          )}
        </label>
      </div>
      <div className="btn">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};
