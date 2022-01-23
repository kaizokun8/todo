package com.todo.user.config;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ErrorHandlingControllerAdvice {

    private static Map<String, HttpStatus> violationsStatus;

    static {

        violationsStatus = new HashMap<>();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationErrorResponse onConstraintValidationException(ConstraintViolationException e) {

        ValidationErrorResponse error = new ValidationErrorResponse();

        for (ConstraintViolation violation : e.getConstraintViolations()) {

            HttpStatus status = violationsStatus.get(violation.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName());

            status = status == null ? HttpStatus.BAD_REQUEST : status;

            error.getViolations().add(
                    new Violation(violation.getPropertyPath().toString(), violation.getMessage(), status.value()));
        }

        return error;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ValidationErrorResponse onMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        ValidationErrorResponse error = new ValidationErrorResponse();
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            error.getViolations().add(
                    new Violation(fieldError.getField(), fieldError.getDefaultMessage()));
        }

        return error;
    }

}
