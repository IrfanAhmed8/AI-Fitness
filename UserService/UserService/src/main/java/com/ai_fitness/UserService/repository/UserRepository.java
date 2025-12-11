package com.ai_fitness.UserService.repository;

import com.ai_fitness.UserService.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    boolean existsByEmail(String email);

    User findByEmail(String email);   // <-- ADD THIS

    boolean existsById(String id);

    Boolean existsByKeyCloakId(String id);
}
