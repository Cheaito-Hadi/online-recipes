import React, { useState, useEffect } from 'react';
import './styles.css';
import RecipeCard from '../../components/RecipeCard';
import axios from 'axios';

function Landing() {
  const url = 'http://127.0.0.1:8000/api';
  
  const [recipeData, setRecipeData] = useState([]);
  useEffect(() => {
    async function fetchRecipeData() {
      try {
        const response = await axios.get(url + '/get_recipes');
        if (response.data.message === 'success') {
          setRecipeData(response.data.recipe_data);
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    }
    fetchRecipeData();
  }, []);
  return (
    <div className="landing-container">
      {recipeData.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default Landing;