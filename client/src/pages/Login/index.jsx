import React from "react";
import "./styles.css";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";

function Login() {
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
      const message = response.data.message;
      if (message === "Logged in") {
        localStorage.setItem("token", response.data.authorization.token);
        console.log("Logged")
      }
    } catch (error) {
        console.log('error')
      console.error("Login error:", error);
    }
  };
  return (
    <div className="container">
      <div className="login-box">
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
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
