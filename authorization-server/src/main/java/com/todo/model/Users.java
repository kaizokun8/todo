package com.todo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Collection;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class Users {

    @Id
    protected String username;

    protected String password;

    protected Boolean enabled;

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Authority> authorities;
}
