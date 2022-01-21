package com.todo.model;

import lombok.Getter;
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
import java.util.Date;
import java.util.Objects;

@Entity
@DynamicUpdate
@NoArgsConstructor
@Setter
@Getter
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.ORDINAL)
    private Priority priorityOrdinal;

    private Date creationDate;

    private Date updateDate;

    private boolean scheduled;

    private Date startDate;

    private Date endDate;

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

    public void setPriority(Priority priority) {
        this.priority = priority;
        this.priorityOrdinal = priority;
    }


}
