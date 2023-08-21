    import React, {useEffect, useState} from 'react';
    import './styles.css';
    import RecipeCard from '../../components/RecipeCard';
    import axios from 'axios';
    import RecipeModal from "../../components/RecipeModal";

    function Landing() {
        const url = 'http://127.0.0.1:8000/api';

        const [recipeData, setRecipeData] = useState([]);
        const [originalRecipeData, setOriginalRecipeData] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [searchName, setSearchName] = useState();
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
                        setOriginalRecipeData(response.data.recipe_data);
                    }
                } catch (error) {
                    console.error('Error fetching recipe data:', error);
                }
            }

            fetchRecipeData();
        }, []);
        
        const filterBySearch = (event) => {
            // debugger;
            const keyword = event.target.value.toLowerCase();
            if (keyword !== '') {

            const filteredResults = recipeData.filter((recipe) => {
                const nameMatch = (
                    recipe.name.toLowerCase().startsWith(keyword) ||
                    recipe.cuisine.name.toLowerCase().startsWith(keyword)
                );
                const ingredientMatch = recipe.ingredients.some((ingredient) =>
                    ingredient.name.toLowerCase().includes(keyword)
                );

                return nameMatch || ingredientMatch;
            });
            //   debugger;
            setRecipeData(filteredResults);
                } else {
                    setRecipeData(originalRecipeData);
                }
            setSearchName(keyword)
        };
        return (
            <div className="landing-container">
                <input id="search-box" value={searchName} onChange={filterBySearch} placeholder="Search by name, cuisine, or ingredient..."/>
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