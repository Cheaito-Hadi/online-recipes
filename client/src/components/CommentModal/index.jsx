import React, {useEffect, useState} from "react";
import "./styles.css";
import axios from 'axios';
function CreateRecipeModal({closeModal, recipeId}) {
    const url = 'http://127.0.0.1:8000/api';
    const [commentsValue, setCommentsValue] = useState([]);
    const [addCommentValue, setAddCommentValue] = useState();

    const handleCommentChange = (event) => {
        setAddCommentValue(event.target.value);
    };
    useEffect(() => {
        async function fetchCommentsData() {
            try {
                const response = await axios.get(url + '/get_comments/' + recipeId, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data) {
                    setCommentsValue(response.data.comments);
                }
            } catch (error) {
                console.error('Error fetching recipe data:', error);
            }
        }

        fetchCommentsData();
    }, [commentsValue]);

    const handleCreateClick = async () => {
        const formData = new FormData();
        formData.append("comment", addCommentValue);
        formData.append("recipe_id", recipeId);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add_comment',
                formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

            // Update commentsValue state with the new comment
            const newComment = { user: "Your Username", comment: addCommentValue }; // You can replace "Your Username" with the actual username
            setCommentsValue([...commentsValue, newComment]);

            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <br/>
                <label className="comment-label">All Comments: </label>
                <div className="comments-container">
                    {commentsValue?.map((comments, index) => {
                        return (<div key={index}>
                            <p>{comments.user}</p>
                            <p>{comments.comment}</p>
                            <br/>
                        </div>);
                    })}
                </div>
                <label className="comment-label">Add Comment:</label>
                <input className="input-main" placeholder="Enter the Comment" value={addCommentValue}
                       onChange={handleCommentChange}
                       type="text"/>
                <button className="send-button" onClick={handleCreateClick}>
                    Add Comment
                </button>
                <button className="modal-close-button" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>);
}

export default CreateRecipeModal;