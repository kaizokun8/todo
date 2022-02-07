package com.todo.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@DynamicUpdate
@NoArgsConstructor
@Setter
@Getter
public class User {

    @Id
    private String sub;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return this.getSub().equals(user.getSub());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getSub());
    }
}
