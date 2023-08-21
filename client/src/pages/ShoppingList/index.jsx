import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import ShoppingListCard from '../../components/ShoppingListCard';

function ShoppingList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/get_shoppinglist', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        const recipeData = response.data.recipe_data;
        setRecipes(recipeData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {recipes.map((recipe, index) => (
        <ShoppingListCard key={index} item={recipe} />
      ))}
    </div>
  );
}

export default ShoppingList;
