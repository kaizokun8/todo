package com.todo.uiserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Controller {

    @GetMapping(value = {"/"})
    public ModelAndView index() {

        return new ModelAndView("/index.html");
    }

    @GetMapping(value = {
            "/todos/list",
            "/todos/list/filter",
            "/todos/id/{idTodo}",
            "/todos/form/edit/{idTodo}",
            "/todos/form/create"})
    public ModelAndView index(@PathVariable(required = false) Long idTodo) {

        return new ModelAndView("/index.html");
    }
}
