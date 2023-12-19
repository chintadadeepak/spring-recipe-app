package com.deepak.springreceipeapp.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SaveRecipe {
    private String userId;
    private String recipeId;
}
