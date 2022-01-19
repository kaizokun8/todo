package com.app.todo.dto;

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

    private Collection<TodoDto> todos;

    private boolean scheduled;

}
