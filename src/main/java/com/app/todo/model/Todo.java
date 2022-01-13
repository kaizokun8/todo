package com.app.todo.model;

import com.app.todo.repository.Views;
import com.app.todo.view.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.Objects;

@Entity
@DynamicUpdate
@NoArgsConstructor
@Setter
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull(groups = Views.OnUpdate.class)
    @Null(groups = Views.OnCreate.class)
    private Long id;

    @NotEmpty
    private String title;

    @Lob
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Priority priority;

    @Enumerated(EnumType.ORDINAL)
    @NotNull
    private Priority priorityOrdinal;

    private Long creationTime;

    private Long updateTime;

    private boolean scheduled;

    private Long startTime;

    private Long endTime;

    private boolean done;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return getId().equals(todo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
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
    public Priority getPriorityOrdinal() {
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
        this.priorityOrdinal = priority;
    }


}
