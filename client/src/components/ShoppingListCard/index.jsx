import React from 'react'
import './styles.css'

function ShoppingListCard({ item }) {
    const { name, ingredients } = item.recipe;
  
    return (
      <div className="recipe-card">
        <h2 className="recipe-name">{name}</h2>
        <ul className="ingredient-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name} - {ingredient.pivot.amount} Kg</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ShoppingListCard;