package com.todo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping(value = "/user")
    public ResponseEntity<?> getUser() {

        SecurityContext securityContext = SecurityContextHolder.getContext();

        if (securityContext.getAuthentication().isAuthenticated()) {

            Object principal = securityContext.getAuthentication().getPrincipal();

            System.out.println("principal");
            System.out.println(principal);

            return new ResponseEntity<>(principal, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
