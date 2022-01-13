package com.app.todo.model;

import com.app.todo.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonView(View.getTodos.class)
public class ToDoSearchResut {

    private Long total;

    private Collection<Todo> todos;

    public Long getTotal() {
        return total;
    }

    public Collection<Todo> getTodos() {
        return todos;
    }
}
