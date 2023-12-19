import React, { useState } from "react";
import { getUserId } from "../hooks/getUserId";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/create-recipe.css";
function CreateRecipe() {
  const userId = getUserId();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    recipeName: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    recipeOwner: userId,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/recipe/addRecipe",
        recipe
      );
      if (response.data === "Recipe Created") alert("Recipe Created");
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="create-recipe-container">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit} className="create-recipe-form">
        <label className="create-recipe-label" htmlFor="name">
          Recipe Name:{" "}
        </label>
        <input
          className="create-recipe-input"
          type="text"
          name="recipeName"
          onChange={handleChange}
        />

        <label className="create-recipe-label" htmlFor="ingredients">
          Ingredients:{" "}
        </label>
        <button
          className="create-recipe-button"
          onClick={addIngredient}
          type="button"
        >
          Add Ingredient
        </button>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            className="create-recipe-ingredient-input"
            // id="create-recipe-ingredient-input"
            name="ingredients"
            type="text"
            key={idx}
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <label className="create-recipe-label" htmlFor="instructions">
          Instructions
        </label>
        <input
          className="create-recipe-input"
          type="text"
          name="instructions"
          onChange={handleChange}
        />
        <label className="create-recipe-label" htmlFor="imageUrl">
          Image Url:{" "}
        </label>
        <input
          className="create-recipe-input"
          type="text"
          name="imageUrl"
          onChange={handleChange}
        />
        <label className="create-recipe-label" htmlFor="cookingTime">
          Cooking Time:
        </label>
        <input
          className="create-recipe-input"
          type="text"
          name="cookingTime"
          onChange={handleChange}
        />
        <button className="create-recipe-button" type="submit">
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
