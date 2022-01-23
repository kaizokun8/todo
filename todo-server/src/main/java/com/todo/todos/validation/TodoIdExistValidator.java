package com.todo.todos.validation;

import com.todo.todos.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class TodoIdExistValidator implements ConstraintValidator<TodoIdExist, Long> {

    @Autowired
    protected TodoRepository todoRepository;

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext constraintValidatorContext) {

        return this.todoRepository.findById(id).isPresent();
    }

}
