package com.deepak.springreceipeapp.models;

// import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
// import lombok.NoArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Document
@Data
public class User {
    @Id
    private String userId;
    private String username;
    private String password;
    private List<Recipe> savedRecipes;

    public User(String username, String password, List<Recipe> savedRecipes) {
        this.username = username;
        this.password = password;
        this.savedRecipes = savedRecipes;
    }
}
