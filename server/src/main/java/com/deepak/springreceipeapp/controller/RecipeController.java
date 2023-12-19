package com.deepak.springreceipeapp.controller;

import java.util.List;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.deepak.springreceipeapp.dao.UserRepository;
// import com.deepak.springreceipeapp.dao.RecipeRepository;
// import com.deepak.springreceipeapp.dao.UserRepository;
import com.deepak.springreceipeapp.models.Recipe;
import com.deepak.springreceipeapp.models.SaveRecipe;
// import com.deepak.springreceipeapp.models.User;
// import com.deepak.springreceipeapp.models.User;
import com.deepak.springreceipeapp.service.RecipeService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    // private UserRepository userRepository;

    @GetMapping("allRecipes")
    public ResponseEntity<List<Recipe>> allRecipes() {
        return recipeService.fetchAllRecipes();
    }

    @PostMapping("addRecipe")
    public ResponseEntity<String> addRecipe(@RequestBody Recipe recipe) {
        return recipeService.addRecipe(recipe);
    }

    @PutMapping("saveRecipe")
    public ResponseEntity<List<String>> saveRecipe(@RequestBody SaveRecipe newRecipe) {
        return recipeService.saveRecipe(newRecipe);
    }

    @GetMapping("savedRecipes/{userId}")
    public ResponseEntity<List<Recipe>> savedRecipes(@PathVariable String userId) {
        return recipeService.savedRecipes(userId);
    }

    @GetMapping("userSavedRecipes/{userId}")
    public ResponseEntity<List<String>> userSavedRecipes(@PathVariable String userId) {
        return recipeService.userSavedRecipes(userId);
    }
}
