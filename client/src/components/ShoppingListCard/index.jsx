import React from 'react'
import './styles.css'

function ShoppingListCard({item}) {
 
    return (
        <div className="recipe-card">
          <h2 className="recipe-name">{item.recipeName}</h2>
          <ul className="ingredient-list">
            {item.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      );
    };
  


export default ShoppingListCard