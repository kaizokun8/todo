package com.todo.config;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Violation {

    public Violation(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }

    private String fieldName;

    private String message;

    private int status;
}
