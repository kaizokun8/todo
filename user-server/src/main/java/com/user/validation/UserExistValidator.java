package com.user.validation;

import com.user.model.User;
import com.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserExistValidator implements ConstraintValidator<UserExist, User> {

    @Autowired
    protected UserRepository userRepository;

    @Override
    public boolean isValid(User user, ConstraintValidatorContext constraintValidatorContext) {

        return user != null && this.userRepository.findById(user.getId()).isPresent();
    }

}
