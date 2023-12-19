import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserId } from "../hooks/getUserId";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userId = getUserId();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/recipe/allRecipes"
        );
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipesIds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipe/userSavedRecipes/${userId}`
        );
        setSavedRecipeIds(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipesIds();
  }, []);

  const saveRecipe = async (recipeId) => {
    if (!userId) {
      alert("You are unauthorized..Register and login first..");
      navigate("/auth");
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/recipe/saveRecipe",
        {
          recipeId: recipeId,
          userId: userId,
        }
      );
      setSavedRecipeIds(response.data);
      if (response.data === "Successfull") alert("Recipe Saved..");
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (recipeId) => savedRecipeIds.includes(recipeId);

  return (
    <div className="home-container">
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe, key) => (
          <li className="recipe-item" key={key}>
            <h2>{recipe.recipeName}</h2>
            <button
              onClick={() => saveRecipe(recipe.recipeId)}
              disabled={isRecipeSaved(recipe.recipeId)}
            >
              {isRecipeSaved(recipe.recipeId) ? "Saved" : "Save"}
            </button>
            <div>
              <img src={recipe.imageUrl} alt={recipe.recipeName} />
            </div>
            <div>
              <p>Instructions : {recipe.instructions}</p>
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

export default Home;
