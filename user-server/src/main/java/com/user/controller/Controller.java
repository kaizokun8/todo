package com.user.controller;

import com.nimbusds.jose.proc.SecurityContext;
import com.user.model.User;
import com.user.repository.UserRepository;
import com.user.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Validated
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/user")
    @JsonView(View.getTodo.class)
    public ResponseEntity<?> getUser(@AuthenticationPrincipal Jwt principal) {

        System.out.println(SecurityContextHolder.getContext());

        if( SecurityContextHolder.getContext().getAuthentication() != null) {
            System.out.println(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getDetails());
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getCredentials());
            System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
        }else{
            System.out.println("NULL AUTHENTICATION");
        }

        System.out.println(principal);



/*
        Optional<User> optionalUser = this.userRepository.findByUsername(principal);

        User user;

        if (optionalUser.isEmpty()) {
            System.out.println("user not found");
            user = new User();
            user.setUsername(principal.getName());
            user = this.userRepository.save(user);

        } else {
            System.out.println("user found");
            user = optionalUser.get();
        }

        return new ResponseEntity<>(user, HttpStatus.OK);

 */
        return new ResponseEntity<>(Map.of("username",""), HttpStatus.OK);

    }

}
