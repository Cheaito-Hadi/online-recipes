import React from "react";
import "./styles.css";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";
import Logo from '../../assets/Logo.svg';
import AnimatedIntro from "../../components/AnimatedIntro";

function Login() {

  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleDataChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        credentials
      );
      console.log(response)
      if (response.status === 200) {
        const responseData = response?.data;
        if (responseData) {
          setauthenticated(true)         
          localStorage.setItem("authenticated", true);
          localStorage.setItem("token", responseData.authorization.token);
          window.location.reload(false);
        }
      }
    } catch (error) {
        console.log('error')
      console.error("Login error:", error);
    }
  };
  return (
    <div className="container">
      <div>
      <AnimatedIntro/>
      </div>
      <div className="login-box">
        <img src={Logo} className="logo-image"/>
        <h2 className="login-heading">Login</h2>
        <Input
          label="Email:"
          placeholder="Enter your email"
            value={credentials.email}
            onChange={handleDataChange}
          name="email"
          type="text"
        />
        <Input
          label="Password:"
          placeholder="Enter your password"
            value={credentials.password}
            onChange={handleDataChange}
          name="password"
          type="password"
        />
        <p>Don't Have an account? <a href="/register" className="register-here">Register here!</a></p>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
