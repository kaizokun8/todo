package com.todo.user.config;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class ValidationErrorResponse {

    private List<Violation> violations = new ArrayList<>();
}
