package com.todo.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoders;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ResourceServerConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.mvcMatcher("/users/**")
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/users/**", "/users")
                .access("hasAuthority('SCOPE_read')")
                .mvcMatchers(HttpMethod.POST, "/users")
                .access("hasAuthority('SCOPE_write')")
                .mvcMatchers(HttpMethod.PUT, "/users", "/users/**")
                .access("hasAuthority('SCOPE_write')")
                .mvcMatchers(HttpMethod.DELETE, "/users/**")
                .access("hasAuthority('SCOPE_admin')")
                .and()
                .oauth2ResourceServer()
                .jwt(Customizer.withDefaults());

        return http.build();
    }

/*
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .authorizeExchange(exchanges ->
                        exchanges
                                .pathMatchers(HttpMethod.GET,"/message/**").hasAuthority("SCOPE_read")
                                .pathMatchers(HttpMethod.POST,"/message/**").hasAuthority("SCOPE_write")
                                .pathMatchers(HttpMethod.PUT,"/message/**").hasAuthority("SCOPE_write")
                                .pathMatchers(HttpMethod.DELETE,"/message/**").hasAuthority("SCOPE_admin")
                                .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2ResourceServer ->
                        oauth2ResourceServer
                                .jwt(withDefaults())
                );
        return http.build();
    }*/
}