package com.todo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OAuth2ClientApplication {

    public static String clientUri;

    @Value("${client.uri}")
    public static void setClientUri(String clientUri) {
        OAuth2ClientApplication.clientUri = clientUri;
    }

    public static void main(String[] args) {
        SpringApplication.run(OAuth2ClientApplication.class, args);
    }

}