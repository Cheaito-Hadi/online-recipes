import React, {useState} from "react";
import "./styles.css";
import axios from 'axios';

const STATUS_IDLE = 0
const STATUS_UPLOADING = 1

function CreateRecipeModal({closeModal}) {
    const [recipeValue, setRecipeValue] = useState("");
    const [cuisineValue, setCuisineValue] = useState("");
    const [ingredientFields, setIngredientField] = useState([{name: '', amount: ''}]);
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState(STATUS_IDLE);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (data) => {
        const selectedFiles = Array.from(data);
        setSelectedImage(selectedFiles.map(file => URL.createObjectURL(file)));
    };
    const renderFileList = () => (<ol>
        {[...files].map((f, i) => (<li key={i}>{f.name} - {f.type}</li>))}
    </ol>)

    const renderButtonStatus = () => ((status === STATUS_IDLE) ? 'Send to server' : <img src="./load.svg"/>)
    const handleFormChange = (event, index) => {
        let data = [...ingredientFields];
        data[index][event.target.name] = event.target.value;
        setIngredientField(data);
    }

    const addFields = () => {
        let object = {
            name: '', amount: ''
        }

        setIngredientField([...ingredientFields, object])
    }

    const removeFields = (index) => {
        let data = [...ingredientFields];
        data.splice(index, 1)
        setIngredientField(data)
    }

    const handleRecipeChange = (event) => {
        setRecipeValue(event.target.value);
    };

    const handleCuisineChange = (event) => {
        setCuisineValue(event.target.value);
    };

    const handleCreateClick = async () => {
        const formData = new FormData();
        formData.append("cuisine", cuisineValue);
        formData.append("name", recipeValue);
        formData.append("ingredients", JSON.stringify(ingredientFields));

        for (let i = 0; i < files.length; i++) {
            formData.append("image_path[]", files[i]);
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_recipe',
            formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log('Response from server:', response.data);
            closeModal();
        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };
    return (<div className="modal-overlay">
            <div className="modal-content">
                <label>Recipe Name:</label>
                <input className="input-main" placeholder="Enter Name" value={recipeValue} onChange={handleRecipeChange}
                       type="text"/>
                <label>Cuisine Name:</label>
                <input className="input-main" placeholder="Enter Name" value={cuisineValue}
                       onChange={handleCuisineChange}
                       type="text"/>
                <label>Ingredients: </label>
                {ingredientFields.map((form, index) => {
                    return (<div key={index}>
                            <input
                                name='name'
                                placeholder='Enter Name'
                                onChange={event => handleFormChange(event, index)}
                                value={form.name}
                            />
                            <input
                                name='amount'
                                placeholder='Enter Amount'
                                onChange={event => handleFormChange(event, index)}
                                value={form.amount}
                            />
                            <button onClick={() => removeFields(index)}>Remove</button>
                        </div>);
                })}
                <button onClick={addFields}>Add More..</button>
                <div className="modal-img-container">
                    <input
                        id="inp"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            setFiles(e.target.files);
                            handleImageChange(e.target.files);
                        }}/>
                    <div className="img-container">
                        {selectedImage?.map((url) => {
                            return (<img className="img-pic" src={url} alt="img"/>
                            )
                        })}</div>
                </div>
                <button className="send-button" onClick={handleCreateClick}>
                    Create Recipe
                </button>
                <button className="modal-close-button" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>);
}

export default CreateRecipeModal;