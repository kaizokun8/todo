package com.app.todo.dto;

import com.app.todo.model.Priority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TodoFilters {

    private String title;

    private String description;

    private Collection<Priority> priority;

    private Long startCreationTime;

    private Long endCreationTime;

    private Long startTime;

    private Long endTime;

    private boolean schedule;

    private Boolean done;

    private Integer page;

    private Integer pageSize;
}
