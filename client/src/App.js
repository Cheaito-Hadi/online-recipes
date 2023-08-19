import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import CreateRecipe from "./pages/CreateRecipe";
import ShoppingList from "./pages/ShoppingList";
import PlanMeals from "./pages/PlanMeals";
import Navbar from './components/Navbar'
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
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/plan-meal" element={<PlanMeals />} />
        </Routes>
    </div>
  );
}

export default App;
