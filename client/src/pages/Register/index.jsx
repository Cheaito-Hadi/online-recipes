import React from 'react'
import "./styles.css";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";

function Register() {

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
        const response = await axios.post("http://127.0.0.1:8000/api/register", info);
        const message = response.data.message;
        if (message ==='User created successfully'){
          localStorage.setItem("token",response.data.user.token)
        }
      } catch (e) {
        console.log(e);
      }
    };
  return (
    <div className="container">
      <div className="inputs-wrapper">
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
        <button className="signup-btn" onClick={submitUser}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Register