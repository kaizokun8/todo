package com.todo.securitylib.facade;

import com.todo.securitylib.dto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
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

    @Autowired
    public void setWebClient(WebClient webClient) {
        this.webClient = webClient;
    }


}
