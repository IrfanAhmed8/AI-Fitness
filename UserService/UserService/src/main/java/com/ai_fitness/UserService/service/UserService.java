package com.ai_fitness.UserService.service;

import com.ai_fitness.UserService.models.RegisterRequest;
import com.ai_fitness.UserService.models.User;
import com.ai_fitness.UserService.models.UserResponse;
import com.ai_fitness.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            User ExistingUser = userRepository.findByEmailId(request.getEmail);

            UserResponse userResponse = new UserResponse();
            userResponse.setId(ExistingUser.getId());
            userResponse.setName(ExistingUser.getName());
            userResponse.setEmail(ExistingUser.getEmail());
            userResponse.setRole(ExistingUser.getRole());
            userResponse.setCreatedAt(ExistingUser.getCreatedAt());
            userResponse.setUpdatedAt(ExistingUser.getUpdatedAt());
            return userResponse;
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User savedUser = userRepository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUser.getId());
        userResponse.setName(savedUser.getName());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setRole(savedUser.getRole());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());

        return userResponse;
    }

    public UserResponse signIn(String id) {
        // Find user by ID, or throw if not found
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        // Map all fields from User -> UserResponse
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());

        return userResponse;
    }

    public Boolean validate(String id) {
        return userRepository.existsByKeyCloakId(id);
    }
}
