package com.app.todo.controller;

import com.app.todo.dto.TodoFilters;
import com.app.todo.model.Priority;
import com.app.todo.model.ToDoSearchResut;
import com.app.todo.model.Todo;
import com.app.todo.repository.TodoSearchService;
import com.app.todo.repository.TodoRepository;
import com.app.todo.repository.Views;
import com.app.todo.validation.TodoExist;
import com.app.todo.validation.TodoIdExist;
import com.app.todo.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;

@RestController
@Validated
public class controller {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoSearchService todoSearchService;

    @PostMapping(value = "/todos")
    @Validated(value = Views.OnCreate.class)
    public ResponseEntity<?> createTodo(@Valid @RequestBody @NotNull Todo todo) {

        todo.setCreationTime(new Date().getTime());
        todo.setUpdateTime(new Date().getTime());

        return new ResponseEntity<>(this.todoRepository.save(todo), HttpStatus.CREATED);
    }

    @PutMapping(value = "/todos")
    @Validated(value = Views.OnUpdate.class)
    public ResponseEntity<?> updateTodo(@Valid @RequestBody @NotNull @TodoExist Todo todo_p) {

        Todo todo = this.todoRepository.findById(todo_p.getId()).get();

        todo.setUpdateTime(new Date().getTime());
        todo.setTitle(todo_p.getTitle());
        todo.setDescription(todo_p.getDescription());
        todo.setPriority(todo_p.getPriority());
        todo.setStartTime(todo_p.getStartTime());
        todo.setEndTime(todo_p.getEndTime());

        todo = this.todoRepository.save(todo);

        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    @DeleteMapping(value = "/todos/{id}")
    @Validated(value = Views.OnCreate.class)
    public ResponseEntity<?> deleteTodo(@PathVariable @NotEmpty @TodoIdExist Long id) {

        Optional<Todo> optionalTodo = this.todoRepository.findById(id);

        if (optionalTodo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        this.todoRepository.delete(optionalTodo.get());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/todos/{id}")
    @Validated(value = Views.OnCreate.class)
    @JsonView(View.getTodo.class)
    public ResponseEntity<?> getTodo(@PathVariable @NotEmpty @TodoIdExist Long id) {

        Optional<Todo> optionalTodo = this.todoRepository.findById(id);

        if (optionalTodo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(optionalTodo.get(), HttpStatus.OK);
    }

    @GetMapping(value = "/todos")
    @Validated(value = Views.OnCreate.class)
    @JsonView(View.getTodos.class)
    public ResponseEntity<?> getTodos(@RequestParam(required = false) String title,
                                      @RequestParam(required = false) String description,
                                      @RequestParam(required = false) Collection<Priority> priority,
                                      @RequestParam(required = false) Long startCreationTime,
                                      @RequestParam(required = false) Long endCreationTime,
                                      @RequestParam(required = false) Long startTime,
                                      @RequestParam(required = false) Long endTime,
                                      @RequestParam(required = false) boolean scheduled,
                                      @RequestParam(required = false) Boolean done,
                                      @RequestParam(required = false) Integer page,
                                      @RequestParam(required = false) Integer pageSize) {

        System.out.println("getTodos");

        TodoFilters todoFilters = new TodoFilters(title, description,
                priority, startCreationTime, endCreationTime,
                startTime, endTime, scheduled, done, page, pageSize);

        Long total = todoSearchService.countTodos(todoFilters);

        Collection<Todo> todos = todoSearchService.getTodos(todoFilters);

        ToDoSearchResut toDoSearchResut = new ToDoSearchResut(total, todos);

        return new ResponseEntity<>(toDoSearchResut, HttpStatus.OK);
    }

}
