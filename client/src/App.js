import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import {Routes, Route } from "react-router-dom";

function App() {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <div>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
    </div>
  );
}

export default App;
