package com.deepak.springreceipeapp.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.deepak.springreceipeapp.models.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
