package com.todo.user.facade;

import com.todo.securitylib.dto.UserInfo;
import com.todo.securitylib.facade.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpServletRequest request;

    @Value("${spring.security.oauth2.resourceserver.jwt.userinfo}")
    private String userInfoUri;

    public UserInfo getUserInfo() {

        return this.userService.getUserInfo(this.request, this.userInfoUri);
    }


}
