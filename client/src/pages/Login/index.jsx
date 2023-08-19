import React from 'react'
import './styles.css'
import Input from '../../components/Input'



function login() {
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <Input
          label="Email:"
          placeholder="Enter your email"
        //   value={credentials.email}
        //   onChange={handleDataChange}
          name="email"
          type="text"
        />
        <Input
          label="Password:"
          placeholder="Enter your password"
        //   value={credentials.password}
        //   onChange={handleDataChange}
          name="password"
          type="password"
        />
        <button className="login-btn" >
          Login
        </button>
      </div>
    </div>
  );
}

export default login