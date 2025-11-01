package com.ai_fitness.UserService.controller;

import com.ai_fitness.UserService.models.RegisterRequest;
import com.ai_fitness.UserService.models.UserResponse;
import com.ai_fitness.UserService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/signIn/{id}")
    public ResponseEntity<UserResponse> signIn(@PathVariable String id){
        return ResponseEntity.ok(userService.signIn(id));
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(userService.register(request));
    }
    @GetMapping ("{id}/validate")
    public ResponseEntity<Boolean> validate(@PathVariable String id){
        return ResponseEntity.ok(userService.validate(id));
    }


}
