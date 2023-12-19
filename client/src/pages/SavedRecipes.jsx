import React, { useEffect, useState } from "react";
import { getUserId } from "../hooks/getUserId";
import axios from "axios";
import "../styles/saved-recipe.css";
function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = getUserId();
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipe/savedRecipes/${userId}`
        );
        setSavedRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedRecipes();
  }, []);

  return (
    <div className="saved-recipe-container">
      <h1>Recipes</h1>
      <ul>
        {savedRecipes.map((recipe, key) => (
          <li className="recipe-item" key={key}>
            <h2>{recipe.recipeName}</h2>
            <div>
              <img src={recipe.imageUrl} alt={recipe.recipeName} />
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <div>
              <p>Cooking Time : {recipe.cookingTime} (in minutes)</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedRecipes;
