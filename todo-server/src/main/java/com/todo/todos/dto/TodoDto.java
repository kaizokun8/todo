package com.todo.todos.dto;

import com.todo.todos.model.Priority;
import com.todo.todos.model.Todo;
import com.todo.todos.repository.Views;
import com.todo.todos.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@NoArgsConstructor
@Setter
@Getter
public class TodoDto {

    @NotNull(groups = Views.OnUpdate.class)
    @Null(groups = Views.OnCreate.class)
    private Long id;

    @NotEmpty
    @Size(min = 3, max = 255)
    private String title;

    private String description;

    @NotNull
    private Priority priority;

    private Integer priorityOrdinal;

    private Long creationTime;

    private Long updateTime;

    private boolean scheduled;

    private Long startTime;

    private Long endTime;

    private boolean done;

    public static Todo toEntity(TodoDto dto) {

        Todo todo = new Todo();

        if (dto == null) {
            return todo;
        }

        todo.setId(dto.id);
        todo.setTitle(dto.title);
        todo.setDescription(dto.description);
        todo.setScheduled(dto.scheduled);
        if (todo.isScheduled()) {
            todo.setEndDate(dto.endTime != null ? new Date(dto.endTime) : null);
            todo.setStartDate(dto.startTime != null ? new Date(dto.startTime) : null);
        } else {
            todo.setEndDate(null);
            todo.setStartDate(null);
        }
        todo.setPriority(dto.priority);
        todo.setCreationDate(dto.creationTime != null ? new Date(dto.creationTime) : null);
        todo.setUpdateDate(dto.updateTime != null ? new Date(dto.updateTime) : null);
        todo.setDone(dto.done);

        return todo;
    }

    public static TodoDto toDto(Todo entity) {

        TodoDto todoDto = new TodoDto();

        if (entity == null) {
            return todoDto;
        }

        todoDto.setId(entity.getId());
        todoDto.setTitle(entity.getTitle());
        todoDto.setDescription(entity.getDescription());
        todoDto.setScheduled(entity.isScheduled());
        if (entity.isScheduled()) {
            todoDto.setEndTime(entity.getEndDate() != null ? entity.getEndDate().getTime() : null);
            todoDto.setStartTime(entity.getStartDate() != null ? entity.getStartDate().getTime() : null);
        } else {
            todoDto.setEndTime(null);
            todoDto.setStartTime(null);
        }
        todoDto.setPriority(entity.getPriority());
        todoDto.setPriorityOrdinal(entity.getPriorityOrdinal() != null ? entity.getPriorityOrdinal().ordinal() : null);
        todoDto.setCreationTime(entity.getCreationDate().getTime());
        todoDto.setUpdateTime(entity.getUpdateDate().getTime());
        todoDto.setDone(entity.isDone());

        return todoDto;
    }

    public static Collection<Todo> toEntities(Collection<TodoDto> dtos) {
        return dtos.stream().map(d -> toEntity(d)).collect(Collectors.toList());
    }

    public static Collection<TodoDto> toDtos(Collection<Todo> entities) {
        return entities.stream().map(e -> toDto(e)).collect(Collectors.toList());
    }


    @JsonView(View.Id.class)
    public Long getId() {
        return id;
    }

    @JsonView(View.Title.class)
    public String getTitle() {
        return title;
    }

    @JsonView(View.Description.class)
    public String getDescription() {
        return description;
    }

    @JsonView(View.Priority.class)
    public Priority getPriority() {
        return priority;
    }

    @JsonView(View.Priority.class)
    public Integer getPriorityOrdinal() {
        return priorityOrdinal;
    }

    @JsonView(View.Scheduled.class)
    public boolean isScheduled() {
        return scheduled;
    }

    @JsonView(View.SaveTime.class)
    public Long getCreationTime() {
        return creationTime;
    }

    @JsonView(View.SaveTime.class)
    public Long getUpdateTime() {
        return updateTime;
    }

    @JsonView(View.Time.class)
    public Long getStartTime() {
        return startTime;
    }

    @JsonView(View.Time.class)
    public Long getEndTime() {
        return endTime;
    }

    @JsonView(View.Done.class)
    public boolean isDone() {
        return done;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
        this.priorityOrdinal = this.priority != null ? this.priority.ordinal() : 0;
    }
}
