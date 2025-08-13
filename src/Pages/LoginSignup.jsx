import React, { useState } from "react";
import axios from "axios";
import "./SCSS/LoginSignup.scss";
export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login Function Ececuted",formData);
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
    const msg =
      err?.response?.data?.errors;
    alert(msg);
  }

  }

 const signup = async () => {
  try {
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
    const msg =
      err?.response?.data?.errors;
    alert(msg);
  }
};

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />
          ) : (
            <></>
          )}
          <input name="email" value={formData.email} onChange={changeHandler}  type="email" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} >Continue</button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account ? <span onClick={() => {setState("Login")}}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account ? <span onClick={() => {setState("Sign Up")}} >Click here</span>
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
