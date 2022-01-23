package com.todo.securitylib.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserInfo {

    @EqualsAndHashCode.Include
    private String sub;

    private String email;

    private boolean email_verified;

    private String preferred_username;

    private String given_name;

    private String family_name;

}
