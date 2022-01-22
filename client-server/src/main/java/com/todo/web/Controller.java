package com.todo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collections;
import java.util.Map;

@RestController
public class Controller {

    @Autowired
    private WebClient webClient;

    @GetMapping(value = {"/"})
    public ModelAndView index( @RegisteredOAuth2AuthorizedClient("client-authorization-code")
                                           OAuth2AuthorizedClient authorizedClient) {

        return new ModelAndView("redirect:http://127.0.0.1:4200");

        //return new ModelAndView("redirect:http://localhost:4200");
    }

    /*
    @GetMapping(value = {"/", "/todos"})
    public String[] getArticles(
            @RegisteredOAuth2AuthorizedClient("client-authorization-code")
                    OAuth2AuthorizedClient authorizedClient
    ) {
        return this.webClient
                .get()
                .uri("http://127.0.0.1:8090/todo-server/todos?scheduled=true")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(String[].class)
                .block();
    }
*/

    @GetMapping(value = "/token", produces = MediaType.TEXT_PLAIN_VALUE)
    public String getToken(@RegisteredOAuth2AuthorizedClient("client-authorization-code")
                                   OAuth2AuthorizedClient authorizedClient) {

        System.out.println("name : " + authorizedClient.getPrincipalName());
        System.out.println("token type : " + authorizedClient.getAccessToken().getTokenType().getValue());
        System.out.println("token value : " + authorizedClient.getAccessToken().getTokenValue());
        System.out.println("refresh token value : " + authorizedClient.getRefreshToken().getTokenValue());

        authorizedClient.getAccessToken().getScopes().forEach(scope -> System.out.println("scope : " + scope));

        return authorizedClient.getAccessToken().getTokenValue();
    }

    @GetMapping("/user")
    public Map<String, Object> user(@RegisteredOAuth2AuthorizedClient("client-authorization-code")
                                                OAuth2AuthorizedClient authorizedClient) {

        return Collections.singletonMap("username", authorizedClient.getPrincipalName());
    }


}