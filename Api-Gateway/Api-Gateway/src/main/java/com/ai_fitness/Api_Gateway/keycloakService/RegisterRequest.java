package com.ai_fitness.Api_Gateway.keycloakService;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String keyCloakId;
    private String password;
}
