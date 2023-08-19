import React from 'react'
import './styles.css'

function Navbar() {
    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated')
        window.location = '/';   
      }

  return (
    <nav className="navbar">
      <div className="site-logo">
        <span className="site-name">Online Recipes</span>
      </div>
      <ul>
        <a href="/">Home</a>
        <a href="/create-recipe">Create Recipe</a>
        <a href="/shopping-list">Shopping List</a>
        <a href="/plan-meal">Plan Meals</a>
        <a href="/" onClick={handleLogout}>Logout</a>
      </ul>
    </nav>
  )
}

export default Navbar