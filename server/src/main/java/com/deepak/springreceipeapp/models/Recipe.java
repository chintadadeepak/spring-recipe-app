package com.deepak.springreceipeapp.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Recipe {
    @Id
    private String recipeId;

    public Recipe(String recipeName, String[] ingredients, String imageUrl, String instructions, int cookingTime,
            String recipeOwner) {
        this.recipeName = recipeName;
        this.ingredients = ingredients;
        this.imageUrl = imageUrl;
        this.instructions = instructions;
        this.cookingTime = cookingTime;
        this.recipeOwner = recipeOwner;
    }

    private String recipeName;
    private String[] ingredients;
    private String imageUrl;
    private String instructions;
    private int cookingTime;
    private String recipeOwner;
}
