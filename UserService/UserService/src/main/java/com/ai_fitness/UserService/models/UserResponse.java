package com.ai_fitness.UserService.models;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
