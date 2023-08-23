import React from "react";
import "./styles.css";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";import Logo from '../../assets/Logo.svg';
import AnimatedIntro from "../../components/AnimatedIntro";

function Register() {
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const [info, setInfo] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleDataChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const submitUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        info
      );
      if (response.status === 200) {
        const responseData = response?.data;
        if (responseData) {
          setauthenticated(true)         
          localStorage.setItem("authenticated", true);
          localStorage.setItem("token", responseData.user.token);
          console.log('registered')
          window.location = '/';   
        }
      }
    } catch (error) {
        console.log('error')
      console.error("Register error:", error);
    }
  };
  return (
    <div className="container">
      <div>
        <AnimatedIntro/>
      </div>
      <div className="inputs-wrapper">
        <img src={Logo} className="logo-image" alt="img loading"/>
        <h2 className="signup-heading">Register</h2>
        <Input
          label="Full name"
          placeholder="Full Name"
          name="name"
          value={info.full_name}
          onChange={handleDataChange}
          type="text"
        />
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          value={info.email}
          onChange={handleDataChange}
          type="text"
        />
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          value={info.password}
          onChange={handleDataChange}
          type="password"
        />
        <a href="/" className="register-here">Go back to login</a>
        <button className="signup-btn" onClick={submitUser}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;
