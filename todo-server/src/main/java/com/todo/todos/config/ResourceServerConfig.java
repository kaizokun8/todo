package com.todo.todos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class ResourceServerConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.mvcMatcher("/todos/**")
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/todos/**", "/todos")
                .access("hasAuthority('SCOPE_read')")
                .mvcMatchers(HttpMethod.POST, "/todos")
                .access("hasAuthority('SCOPE_write')")
                .mvcMatchers(HttpMethod.PUT, "/todos", "/todos/**")
                .access("hasAuthority('SCOPE_write')")
                .mvcMatchers(HttpMethod.DELETE, "/todos/**")
                .access("hasAuthority('SCOPE_admin')")
                .and()
                .oauth2ResourceServer()
                .jwt();

        return http.build();
    }
}