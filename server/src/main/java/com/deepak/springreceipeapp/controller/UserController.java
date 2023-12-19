package com.deepak.springreceipeapp.controller;

import java.security.NoSuchAlgorithmException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.deepak.springreceipeapp.models.User;
import com.deepak.springreceipeapp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("register")
    @CrossOrigin
    public ResponseEntity<String> register(@RequestBody User user) {
        // System.out.println("Method called..");
        return userService.register(user);
    }

    @PostMapping("login")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody User user) throws NoSuchAlgorithmException {
        return userService.login(user);
    }
}
