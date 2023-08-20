import React from 'react';
import './styles.css';
import { AiFillHeart } from 'react-icons/ai';
import { BiSolidCommentMinus } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../../assets/img1.jpg'
import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.jpeg'

function RecipeCard() {
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
        <div>
          <img src={img1}alt="Imag" />
        </div>
        <div>
          <img src={img2} alt="Imag" />
        </div>
        <div>
          <img src={img3} alt="Imag" />
        </div>
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
