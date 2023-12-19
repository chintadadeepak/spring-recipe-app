package com.deepak.springreceipeapp.service;

import java.util.ArrayList;
import java.util.List;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.deepak.springreceipeapp.dao.RecipeRepository;
import com.deepak.springreceipeapp.dao.UserRepository;
import com.deepak.springreceipeapp.models.Recipe;
import com.deepak.springreceipeapp.models.SaveRecipe;
import com.deepak.springreceipeapp.models.User;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<List<Recipe>> fetchAllRecipes() {
        return new ResponseEntity<>(recipeRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<String> addRecipe(Recipe recipe) {
        recipeRepository.save(new Recipe(recipe.getRecipeName(),
                recipe.getIngredients(), recipe.getImageUrl(),
                recipe.getInstructions(), recipe.getCookingTime(),
                recipe.getRecipeOwner()));
        return new ResponseEntity<>("Recipe Created", HttpStatus.OK);
    }

    public ResponseEntity<List<String>> saveRecipe(SaveRecipe newRecipe) {
        Recipe recipe = recipeRepository.findById(newRecipe.getRecipeId()).get();
        User user = userRepository.findById(newRecipe.getUserId()).get();
        user.getSavedRecipes().add(recipe);
        userRepository.save(user);
        List<String> recipeIds = userSavedRecipes(newRecipe.getUserId()).getBody();
        return new ResponseEntity<>(recipeIds, HttpStatus.OK);
    }

    public ResponseEntity<List<Recipe>> savedRecipes(String userId) {
        List<Recipe> savedRecipes = userRepository.findById(userId).get().getSavedRecipes();
        return new ResponseEntity<>(savedRecipes, HttpStatus.OK);
    }

    public ResponseEntity<List<String>> userSavedRecipes(String userId) {
        User user = userRepository.findById(userId).get();
        List<String> recipeIds = new ArrayList<>();
        List<Recipe> recipes = recipeRepository.findAll();
        List<Recipe> savedRecipes = user.getSavedRecipes();
        for (Recipe recipe : recipes) {
            for (int i = 0; i < savedRecipes.size(); i++) {
                if (recipe.getRecipeId().equals(savedRecipes.get(i).getRecipeId()))
                    recipeIds.add(recipe.getRecipeId());
            }
        }
        return new ResponseEntity<>(recipeIds, HttpStatus.OK);
    }
}
