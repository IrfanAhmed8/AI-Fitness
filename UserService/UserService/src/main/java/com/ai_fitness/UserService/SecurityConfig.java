package com.ai_fitness.UserService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // disable CSRF (important for Postman JSON POSTs)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // ✅ allow all requests temporarily
                );

        return http.build();
    }
}
