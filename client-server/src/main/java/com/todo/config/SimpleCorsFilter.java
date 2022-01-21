package com.todo.config;

import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@NoArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCorsFilter implements Filter {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${server.cors.allowedOrigins}")
    public void setKeyStorePath(String allowedOrigins) {

        String[] allowedOriginsTab = allowedOrigins.split(",");

        SimpleCorsFilter.allowedOrigins = Arrays.stream(allowedOriginsTab).collect(Collectors.toSet());
    }

    private static Set<String> allowedOrigins;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        String origin = request.getHeader("Origin");

        response.setHeader("Access-Control-Allow-Origin", origin);

        //response.setHeader("Access-Control-Allow-Origin", allowedOrigins.contains(origin) ? origin : "");

        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with, authorization, UUID, Content-Type, X-XSRF-TOKEN, Accept-Language, Content-Language");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {

            System.out.println(((HttpServletRequest) req).getMethod() + "  REQUEST OPTIONS");

            response.setStatus(HttpServletResponse.SC_OK);

        } else {

            System.out.println(((HttpServletRequest) req).getMethod() + "  REQUEST");

            chain.doFilter(req, res);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}