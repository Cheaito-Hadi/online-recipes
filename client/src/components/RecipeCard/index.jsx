import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css'

function RecipeCard({ recipe }) {
  const url = 'http://127.0.0.1:8000/api';
   
  return (
    <div className="card-container">
      <div className="title-container">
        <h3 className="title">{recipe.name}</h3>
        <div className="icons-container">
          <AiFillHeart /> {recipe.likes_count}
          <BiSolidCommentMinus /> {recipe.comments_count}
          <IoMdShareAlt />
        </div>
      </div>
      <Carousel className="images-container">
        {recipe.images.map((image) => (
          <div key={image.id}>
            <img src={url + '/get_image/' + image.id} alt="Imag" />
          </div>
        ))}
      </Carousel>
      <h4>Cuisine: {recipe.cuisine.name}</h4>
      <div className="ingredients-list">
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name} /Amount: {ingredient.pivot.amount}Kg</li>
          ))}
        </ul>
      </div>
      <div className="button-container">
        <button className="list-btn">Add to List</button>
      </div>
    </div>
  );
}

export default RecipeCard;
