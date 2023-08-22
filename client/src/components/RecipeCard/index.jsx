import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidCommentMinus } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";
import CommentModal from "../../components/CommentModal";
import axios from "axios";

function RecipeCard({ recipe }) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [like, setLike] = useState(recipe.is_liked);
  const [likesCount, setLikesCount] = useState(recipe.likes_count);
  const openModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeModal = () => {
    setIsCommentModalOpen(false);
  };
  const url = "http://127.0.0.1:8000/api";

  const handleAddToShoppingList = async () => {
    try {
      await axios.post(
        `${url}/create_shoppinglist`,
        { recipe_id: recipe.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };
  const handleLikes = async () => {
    try {
      await axios.post(
        `${url}${like ? "/unlike_recipe" : "/like_recipe"}`,
        { recipe_id: recipe.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = () => {
    handleLikes();
    setLike(like ? false : true);
    setLikesCount(!like ? likesCount + 1 : likesCount - 1);
  };

  return (
    <div className="card-container">
      <div className="title-container">
        <h3 className="title">{recipe.name}</h3>
        <div className="icons-container">
          <AiFillHeart
            onClick={(e) => {
              e.stopPropagation();
              likeHandler();
            }}
          />{" "}
          {likesCount}
          <a onClick={openModal}>
            <BiSolidCommentMinus /> {recipe.comments_count}
          </a>
          <IoMdShareAlt />
        </div>
      </div>
      {isCommentModalOpen && (
        <CommentModal closeModal={closeModal} recipeId={recipe.id} />
      )}
      <Carousel className="images-container">
        {recipe.images.map((image) => (
          <div key={image.id}>
            <img src={url + "/get_image/" + image.id} alt="Imag" />
          </div>
        ))}
      </Carousel>
      <h4>Cuisine: {recipe.cuisine.name}</h4>
      <div className="ingredients-list">
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} /Amount: {ingredient.pivot.amount}Kg
            </li>
          ))}
        </ul>
      </div>
      <div className="button-container">
        <button className="list-btn" onClick={handleAddToShoppingList}>
          Add to List
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
