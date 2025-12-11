package com.ai_fitness.Api_Gateway.keycloakService;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private String id;
    private String keyCloakId;
    private String name;
    private String email;
    private UserRole role=UserRole.USER;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
