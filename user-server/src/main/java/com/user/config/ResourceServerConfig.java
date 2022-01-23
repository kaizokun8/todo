package com.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class ResourceServerConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.mvcMatcher("/users/**")
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/users/**", "/users", "/user")
                .access("hasAuthority('SCOPE_read')")
                .mvcMatchers(HttpMethod.POST, "/users")
                .access("hasAuthority('SCOPE_write')")
                .mvcMatchers(HttpMethod.PUT, "/users", "/users/**")
                .access("hasAuthority('SCOPE_write')")
                .mvcMatchers(HttpMethod.DELETE, "/users/**")
                .access("hasAuthority('SCOPE_admin')")
                .and()
                .oauth2ResourceServer()
                .jwt().jwtAuthenticationConverter(new JwtAuthenticationConverter());

        return http.build();
    }
}