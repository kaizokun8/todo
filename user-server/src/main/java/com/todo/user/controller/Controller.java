package com.todo.user.controller;

import com.todo.securitylib.facade.UserService;
import com.todo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@Validated
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    HttpServletRequest request;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/users/connected")
    public ResponseEntity<?> getUser(/*@AuthenticationPrincipal Jwt principal*/) {

        return new ResponseEntity<>(this.userService.getUserInfo(), HttpStatus.OK);
    }

}
