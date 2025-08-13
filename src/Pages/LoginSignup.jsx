import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "./SCSS/LoginSignup.scss";

const SignupSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

export const LoginSignup = () => {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
  };

  const login = async () => {
    console.log("Login Function Ececuted", formData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        formData,
        { headers: { accept: "application/json" } }
      );

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Signup failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.errors;
      alert(msg);
    }
  };

  const signup = async () => {
    try {
      await SignupSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const { data } = await axios.post(
        "http://localhost:4000/signup",
        formData,
        { headers: { accept: "application/json" } }
      );

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Signup failed");
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

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Your Name"
              />
              {errors.username && <small style={{ color: "red" }}>{errors.username}</small>}
            </>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
          {errors.general && (
          <small style={{ color: "red" }}>{errors.general}</small>
        )}
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account ?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account ?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy. </p>
        </div>
      </div>
    </div>
  );
};
