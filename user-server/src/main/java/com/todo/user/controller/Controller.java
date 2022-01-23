package com.todo.user.controller;

import com.todo.securitylib.dto.UserInfo;
import com.todo.user.facade.UserFacade;
import com.todo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Validated
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserFacade userFacade;

    @GetMapping(value = "/users/connected")
    public ResponseEntity<?> getUser() {

        UserInfo userInfo = this.userFacade.getUserInfo();

        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

}
