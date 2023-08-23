import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import React, {useState} from "react";
import {AiFillHeart} from "react-icons/ai";
import {BiSolidCommentMinus} from "react-icons/bi";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";
import CommentModal from "../../components/CommentModal";
import axios from "axios";

function RecipeCard({recipe}) {
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
                {recipe_id: recipe.id},
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
                {recipe_id: recipe.id},
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
        setLike(!like);
        setLikesCount(!like ? likesCount + 1 : likesCount - 1);
    };

    const shareUrl = "https://github.com/Cheaito-Hadi";
    return (
        <div className="card-container">
            <div>
                <div className="title-container">
                    <h2 className="title-recipe-name">{recipe.name}</h2>
                    <div className="icon-container">
                        <AiFillHeart
                            className={`icon ${like ? "icon-liked" : "icon-unliked"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                likeHandler();
                            }}
                        />
                        <span className="icon-text">{likesCount}</span>
                        <a className="icon" onClick={openModal}>
                            <BiSolidCommentMinus /> <span className="icon-text">{recipe.comments_count}</span>
                        </a>
                        <div className="social-icons">
                            <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={20} round={true}/>
                            </FacebookShareButton>
                            <WhatsappShareButton
                                url={shareUrl}
                                hashtag={"#github..."}
                            >
                                <WhatsappIcon size={20} round={true}/>
                            </WhatsappShareButton>
                        </div>
                    </div>

                </div>
                {isCommentModalOpen && (
                    <CommentModal closeModal={closeModal} recipeId={recipe.id}/>
                )}
                <Carousel className="images-container" showThumbs={false} showStatus={false} showIndicators={false}
                          dynamicHeight={false}>
                    {recipe.images.map((image) => (
                        <div key={image.id} className="img-container-carousel">
                            <img className="img-carousel" src={url + "/get_image/" + image.id} alt="Imag"/>
                        </div>
                    ))}
                </Carousel>
                <div className="cuisine-wrapper">
                <h4 className="cuisine-ing">Cuisine: </h4> <span>{recipe.cuisine.name}</span>
                </div>
                <div className="ingredients-list">
                    <h4 className="cuisine-ing">Ingredients:</h4>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                {ingredient.name} /Amount: {ingredient.pivot.amount}Kg
                            </li>
                        ))}
                    </ul>
                </div>

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
