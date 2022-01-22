package com.todo.controller;

import com.todo.dto.TodoDto;
import com.todo.dto.TodoFilters;
import com.todo.model.Priority;
import com.todo.dto.ToDoSearchResut;
import com.todo.model.Todo;
import com.todo.repository.TodoSearchService;
import com.todo.repository.TodoRepository;
import com.todo.repository.Views;
import com.todo.validation.TodoExist;
import com.todo.validation.TodoIdExist;
import com.todo.view.View;
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
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Validated
public class controller {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoSearchService todoSearchService;

    private void throwException() throws Exception {
        if (true) {
            throw new Exception("");
        }
    }

    @PostMapping(value = "/todos")
    @Validated(value = Views.OnCreate.class)
    public ResponseEntity<?> createTodo(@Valid @RequestBody @NotNull TodoDto todoDto) {

        try {

            Todo todo = TodoDto.toEntity(todoDto);

            todo.setCreationDate(new Date());
            todo.setUpdateDate(new Date());
            todo.setDone(false);

            todo = this.todoRepository.save(todo);

            return new ResponseEntity<>(TodoDto.toDto(todo), HttpStatus.CREATED);

        } catch (Exception e) {

            e.printStackTrace();
            return new ResponseEntity<>("An error occured while" +
                    " creating the task " + todoDto.getTitle() + "  !",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/todos")
    @Validated(value = Views.OnUpdate.class)
    public ResponseEntity<?> updateTodo(@Valid @RequestBody @NotNull @TodoExist TodoDto todoDto) {

        try {

            Todo todo = this.todoRepository.findById(todoDto.getId()).get();

            todo.setUpdateDate(new Date());
            todo.setTitle(todoDto.getTitle());
            todo.setDescription(todoDto.getDescription());
            todo.setPriority(todoDto.getPriority());
            todo.setScheduled(todoDto.isScheduled());
            todo.setStartDate(new Date(todoDto.getStartTime()));
            todo.setEndDate(new Date(todoDto.getEndTime()));
            todo.setDone(todoDto.isDone());

            todo = this.todoRepository.save(todo);

            return new ResponseEntity<>(TodoDto.toDto(todo), HttpStatus.OK);

        } catch (Exception e) {

            e.printStackTrace();
            return new ResponseEntity<>("An error occured while" +
                    " updating the task #" + todoDto.getId() + "-" + todoDto.getTitle() + "  !",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/todos/{id}/done")
    @Validated
    public ResponseEntity<?> updateTodoDone(@PathVariable @TodoIdExist Long id, @RequestBody @NotNull Map<String, Object> done) {


        try {

            if (!done.containsKey("done") || !(done.get("done") instanceof Boolean)) {

                return new ResponseEntity<>("The body do not contain the done key or the value is not a boolean", HttpStatus.BAD_REQUEST);
            }

            Optional<Todo> optionalTodo = this.todoRepository.findById(id);

            if (optionalTodo.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Todo todo = optionalTodo.get();
            todo.setDone((Boolean) done.get("done"));
            todo = this.todoRepository.save(todo);

            return new ResponseEntity<>(todo.isDone(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occured while updating " +
                    "the done status of the task #" + id + " !", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/todos/{id}")
    @Validated
    public ResponseEntity<?> deleteTodo(@PathVariable @NotEmpty @TodoIdExist Long id) {

        try {

            this.throwException();

            Optional<Todo> optionalTodo = this.todoRepository.findById(id);

            if (optionalTodo.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            //this.todoRepository.delete(optionalTodo.get());
            return new ResponseEntity<>(HttpStatus.OK);
            //return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            //return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occured while deleting the task #" + id + " !", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/todos/{id}")
    @Validated
    @JsonView(View.getTodo.class)
    public ResponseEntity<?> getTodo(@PathVariable @NotEmpty @TodoIdExist Long id) {

        Optional<Todo> optionalTodo = this.todoRepository.findById(id);

        if (optionalTodo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(TodoDto.toDto(optionalTodo.get()), HttpStatus.OK);
    }

    @GetMapping(value = "/todos/scheduled-days/{month}/{year}")
    public ResponseEntity<?> getScheduledDaysOfMonthAndYear(@PathVariable @NotNull @Min(0) @Max(11) Integer month,
                                                            @PathVariable @NotNull @Min(1980) Integer year) {


        Calendar cal = Calendar.getInstance();
        cal.set(year, month, 1, 0, 0, 0);
        Date firstDay = cal.getTime();
        cal.set(year, month + 1, 0, 0, 0, 0);
        Date lastDay = cal.getTime();

        List<Integer> rs = this.todoSearchService.getScheduledDaysOfMonthAndYear(firstDay, lastDay);

        return new ResponseEntity<>(rs, HttpStatus.OK);
    }

    @GetMapping(value = "/todos")
    @Validated
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

        Date startCreationDate = startCreationTime != null ? new Date(startCreationTime) : null;
        Date endCreationDate = endCreationTime != null ? new Date(endCreationTime) : null;
        Date startDate = startTime != null ? new Date(startTime) : null;
        Date endDate = endTime != null ? new Date(endTime) : null;

        TodoFilters todoFilters = new TodoFilters(title, description,
                priority, startCreationDate, endCreationDate,
                startDate, endDate, scheduled, done, page, pageSize);

        Long total = todoSearchService.countTodos(todoFilters);

        Collection<Todo> todos = todoSearchService.getTodos(todoFilters);

        ToDoSearchResut toDoSearchResut = new ToDoSearchResut(total, TodoDto.toDtos(todos), scheduled);

        return new ResponseEntity<>(toDoSearchResut, HttpStatus.OK);
    }

}
