package com.ai_fitness.Api_Gateway.keycloakService;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    // The WebClient.Builder is marked @LoadBalanced to enable service discovery lookup
    @Bean
    @LoadBalanced
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public WebClient userServiceWebClient(WebClient.Builder webClientBuilder) {
        // FIX: The base URL must be in lowercase ("userservice") to match the
        // spring.application.name of the User Service registration in Eureka.
        return webClientBuilder.baseUrl("http://USER-SERVICE")
                .build();
    }
}
