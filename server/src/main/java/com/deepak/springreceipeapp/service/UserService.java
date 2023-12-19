package com.deepak.springreceipeapp.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.deepak.springreceipeapp.dao.UserRepository;
import com.deepak.springreceipeapp.models.Recipe;
import com.deepak.springreceipeapp.models.User;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> register(User registerUser) {
        String username = registerUser.getUsername();
        User user = userRepository.findByUsername(username);
        if (user != null)
            return new ResponseEntity<>("User Already Existed", HttpStatus.OK);
        String hashedPassword = DigestUtils.sha256Hex(registerUser.getPassword());
        List<Recipe> savedRecipes = new ArrayList<>();
        userRepository.save(new User(username, hashedPassword, savedRecipes));
        return new ResponseEntity<>("User created", HttpStatus.CREATED);
    }

    public ResponseEntity<String> login(User loginUser) {
        String username = loginUser.getUsername();
        User user = userRepository.findByUsername(username);
        if (user == null)
            return new ResponseEntity<>("User Does not exist", HttpStatus.OK);
        boolean hashedPassword = DigestUtils.sha256Hex(loginUser.getPassword())
                .equals(user.getPassword());

        if (!hashedPassword)
            return new ResponseEntity<>("Password is incorrect", HttpStatus.OK);
        return new ResponseEntity<>(user.getUserId(), HttpStatus.OK);
    }
}
