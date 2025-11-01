package com.ai_fitness.Api_Gateway;

import com.ai_fitness.Api_Gateway.keycloakService.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.netty.udp.UdpServer;

@RequiredArgsConstructor
@Component
@Slf4j
public class KeyCloakUserSyncFilter implements WebFilter {
    private final UserService userService;
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        return null;
    }
}
