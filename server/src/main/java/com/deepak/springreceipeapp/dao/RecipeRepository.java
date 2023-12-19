package com.deepak.springreceipeapp.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.deepak.springreceipeapp.models.Recipe;

public interface RecipeRepository extends MongoRepository<Recipe, String> {

}
