package com.todo.securitylib.facade;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import com.todo.securitylib.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserService {

    private WebClient webClient;

    public UserInfo getUserInfo(HttpServletRequest request, String userInfoUri) {
        return this.getUserInfo(request, userInfoUri, "Authorization");
    }

    public UserInfo getUserInfo(HttpServletRequest request, String userInfoUri, String tokenHeaderName) {

        return this.webClient
                .get()
                .uri(userInfoUri)
                .header(tokenHeaderName, request.getHeader(tokenHeaderName))
                .retrieve()
                .bodyToMono(UserInfo.class)
                .block();
    }

    public UserInfo getUserInfo() {

        UserInfo userInfo = new UserInfo();

        Jwt principal = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        userInfo.setEmail(principal.getClaim("email"));
        userInfo.setSub(principal.getClaim("sub"));
        userInfo.setFamily_name(principal.getClaim("family_name"));
        userInfo.setGiven_name(principal.getClaim("given_name"));
        userInfo.setPreferred_username(principal.getClaim("preferred_username"));

        return userInfo;
    }

    @Autowired
    public void setWebClient(WebClient webClient) {
        this.webClient = webClient;
    }


}
