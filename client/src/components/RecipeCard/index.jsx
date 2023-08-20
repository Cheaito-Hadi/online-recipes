import React from 'react';
import './styles.css';
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function RecipeCard() {
  const url = 'http://127.0.0.1:8000/api'
  const imageArray = ['1','2']

  //bas badna njeb ingredients
  const ingredients = ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3', 'Ingredient 3'];

  return (
    <div className="card-container">
      <div className="title-container">
        <h3 className="title">Taboule</h3>
        <div className="icons-container">
          <AiFillHeart /> 40
          <BiSolidCommentMinus />14
          <IoMdShareAlt />
        </div>
      </div>
      <Carousel className="images-container">
        {imageArray.map((image_id) =>(
        <div>
          <img src={url+"/get_image/"+image_id} alt="Imag" />
        </div>
        ) 
        )}
      </Carousel>
      <h4>Cuisine: </h4>
      <div className="ingredients-list">
        <h4>Ingredients:</h4>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="button-container">
        <button className="list-btn">
          Add to List
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
