import React, {useEffect, useState} from 'react';
import './styles.css';
import RecipeCard from '../../components/RecipeCard';
import axios from 'axios';
import RecipeModal from "../../components/RecipeModal";

function Landing() {
    const url = 'http://127.0.0.1:8000/api';

    const [recipeData, setRecipeData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
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
            <div className="modal-create-main">
                <button onClick={openModal}>Create a Recipe</button>
            </div>
            {isModalOpen && (
                <RecipeModal closeModal={closeModal}/>
            )}
            <div className="recipe-container">
            {recipeData.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            ))}</div>
        </div>
    );
}

export default Landing;