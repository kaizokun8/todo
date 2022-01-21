package com.todo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping(value = "/resource")
    public String getToken() {

        return "Hello world oauth2 !";
    }
}
