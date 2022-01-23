package com.todo.todos.dto;

import com.todo.todos.model.Priority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TodoFilters {

    private String title;

    private String description;

    private Collection<Priority> priority;

    private Date startCreationDate;

    private Date endCreationDate;

    private Date startDate;

    private Date endDate;

    private boolean schedule;

    private Boolean done;

    private String sub;

    private Integer page;

    private Integer pageSize;
}
