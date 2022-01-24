package com.todo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Map;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServerOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
public class Controller {

    @Value("${client.uri}")
    private String clientUri;

    @Autowired
    private WebClient webClient;

    @GetMapping(value = {"/login"})
    public ModelAndView login(@RegisteredOAuth2AuthorizedClient("client-authorization-code")
                                      OAuth2AuthorizedClient authorizedClient) {

        //return new ModelAndView("index");
        //return new ModelAndView("redirect:/");
        return new ModelAndView("redirect:" + clientUri);
    }

    private void setRefreshTokenCookie(String refreshToken, HttpServletRequest request,
                                       HttpServletResponse response) {

        try {

            Cookie cookie = WebUtils.getCookie(request, "REFRESH_TOKEN");

            if (cookie == null && refreshToken != null) {
                //same-site necessite de définir le cookie
                response.addHeader("Set-Cookie",
                        "REFRESH_TOKEN=" + refreshToken + "; HttpOnly;" +
                                " SameSite=strict; Secure; Max-Age=" + (3600 * 24 * 10) + "; Path=/");
            }

        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    @GetMapping(value = "/logout")
    public ModelAndView logout(@RegisteredOAuth2AuthorizedClient("client-oidc")
                                       OAuth2AuthorizedClient authorizedClient,
                               HttpServletRequest request,
                               HttpServletResponse response) {
        try {
            Cookie cookie = WebUtils.getCookie(request, "JSESSIONID");

            if (cookie != null) {
                response.addHeader(
                        "Set-Cookie",
                        "JSESSIONID=; Max-Age=0; Path=/");
                response.addHeader(
                        "Set-Cookie",
                        "REFRESH_TOKEN=; Max-Age=0; Path=/");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ModelAndView("redirect:" + clientUri);
    }

    @GetMapping(value = "/token", produces = MediaType.TEXT_PLAIN_VALUE)
    public String getToken(@RegisteredOAuth2AuthorizedClient("client-authorization-code")
                                   OAuth2AuthorizedClient authorizedClient, HttpServletRequest request, HttpServletResponse response) {
/*
        System.out.println("name : " + authorizedClient.getPrincipalName());
        System.out.println("token type : " + authorizedClient.getAccessToken().getTokenType().getValue());
        System.out.println("token value : " + authorizedClient.getAccessToken().getTokenValue());
        System.out.println("refresh token value : " + authorizedClient.getRefreshToken().getTokenValue());

        authorizedClient.getAccessToken().getScopes().forEach(scope -> System.out.println("scope : " + scope));
*/
        this.setRefreshTokenCookie(authorizedClient.getRefreshToken().getTokenValue(), request, response);

        return authorizedClient.getAccessToken().getTokenValue();
    }

    @GetMapping("/user")
    public Object user(@RegisteredOAuth2AuthorizedClient("client-oidc")
                               OAuth2AuthorizedClient authorizedClient) {

        return this.webClient
                .get()
                .uri("http://localhost:8083/auth/realms/SpringBootKeycloak/protocol/openid-connect/userinfo")
                .attributes(oauth2AuthorizedClient(authorizedClient))
                .retrieve()
                .bodyToMono(Object.class)
                .block();

        //return Collections.singletonMap("username", authorizedClient.getPrincipalName());
    }


}