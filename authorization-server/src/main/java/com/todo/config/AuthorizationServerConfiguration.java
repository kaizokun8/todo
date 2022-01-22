package com.todo.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.authorization.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwsEncoder;
import org.springframework.security.oauth2.server.authorization.InMemoryOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationConsentService;
import org.springframework.security.oauth2.server.authorization.JdbcOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationConsentService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.ClientSettings;
import org.springframework.security.oauth2.server.authorization.config.ProviderSettings;
import org.springframework.security.oauth2.server.authorization.config.TokenSettings;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.sql.DataSource;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

//@EnableWebSecurity
public class AuthorizationServerConfiguration {

    //@Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //@Bean
    UserDetailsService users(DataSource dataSource, PasswordEncoder passwordEncoder) {

        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        if(!jdbcUserDetailsManager.userExists("admin")) {

            UserDetails userDetails = new User("admin",
                    passwordEncoder.encode("password"),
                    List.of(new SimpleGrantedAuthority("ROLE_USER"),
                            new SimpleGrantedAuthority("ROLE_ADMIN")));

            jdbcUserDetailsManager.createUser(userDetails);
        }

        if(!jdbcUserDetailsManager.userExists("john")) {

            UserDetails userDetails = new User("john",
                    passwordEncoder.encode("password"),
                    List.of(new SimpleGrantedAuthority("ROLE_USER")));

            jdbcUserDetailsManager.createUser(userDetails);
        }

        if(!jdbcUserDetailsManager.userExists("jane")) {

            UserDetails userDetails = new User("jane",
                    passwordEncoder.encode("password"),
                    List.of(new SimpleGrantedAuthority("ROLE_USER")));

            jdbcUserDetailsManager.createUser(userDetails);
        }

        return jdbcUserDetailsManager;
    }


    //@Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfigurer<HttpSecurity> authorizationServerConfigurer =
                new OAuth2AuthorizationServerConfigurer<>();
        RequestMatcher endpointsMatcher = authorizationServerConfigurer
                .getEndpointsMatcher();

        // @formatter:off
        http
                .requestMatcher(endpointsMatcher)
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.ignoringRequestMatchers(endpointsMatcher))
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .apply(authorizationServerConfigurer);
        // @formatter:on

        return http.build();
    }

    //@Bean
    public RegisteredClientRepository registeredClientRepository(JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {

        JdbcRegisteredClientRepository clientRepository = new JdbcRegisteredClientRepository(jdbcTemplate);

        if (clientRepository.findByClientId("client") == null) {

            JdbcRegisteredClientRepository.RegisteredClientParametersMapper registeredClientParametersMapper = new JdbcRegisteredClientRepository.RegisteredClientParametersMapper();

            registeredClientParametersMapper.setPasswordEncoder(passwordEncoder);

            clientRepository.setRegisteredClientParametersMapper(registeredClientParametersMapper);

            RegisteredClient registeredClient =
                    RegisteredClient
                            .withId(UUID.randomUUID().toString())
                            .clientId("client")
                            .clientName("client")
                            .clientSecret("secret")
                            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                            .authorizationGrantType(AuthorizationGrantType.PASSWORD)
                            .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                            .redirectUri("http://127.0.0.1/login/oauth2/code/client-oidc")
                            .redirectUri("http://127.0.0.1/authorized")
                            .scope(OidcScopes.OPENID)
                            .scope("read")
                            .scope("write")
                            .scope("admin")
                            .clientIdIssuedAt(Instant.now())
                            //.clientSecretExpiresAt(Instant.now().plus(180, ChronoUnit.DAYS))
                            .clientSettings(ClientSettings.builder()
                                    .requireAuthorizationConsent(true)
                                    .requireProofKey(false)
                                    .build())
                            .tokenSettings(TokenSettings.builder()
                                    .accessTokenTimeToLive(Duration.ofSeconds(300))
                                    .refreshTokenTimeToLive(Duration.ofSeconds(3600))
                                    .reuseRefreshTokens(true)
                                    .idTokenSignatureAlgorithm(SignatureAlgorithm.ES256)
                                    .build())
                            .build();

            clientRepository.save(registeredClient);
        }

        return clientRepository;
    }
    //@Bean
    public OAuth2AuthorizationService oAuth2AuthorizationService(
            JdbcTemplate jdbcTemplate,
            RegisteredClientRepository registeredClientRepository) {

        return new JdbcOAuth2AuthorizationService(jdbcTemplate, registeredClientRepository);
    }

    //@Bean
    public OAuth2AuthorizationConsentService oAuth2AuthorizationConsentService(
            JdbcTemplate jdbcTemplate,
            RegisteredClientRepository registeredClientRepository) {

        return new JdbcOAuth2AuthorizationConsentService(jdbcTemplate, registeredClientRepository);
    }

    //@Bean
    JWKSource<SecurityContext> jwkSource() {
        return new ImmutableJWKSet<>(new JWKSet(TestJwks.DEFAULT_RSA_JWK));
    }

    //@Bean
    JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    //@Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwsEncoder(jwkSource);
    }

    //@Bean
    public ProviderSettings providerSettings() {
        return ProviderSettings.builder()
                .issuer("http://localhost:12001/oauth2-server")
                .build();
    }

    //@Bean
    public EmbeddedDatabase embeddedDatabase() {
        // @formatter:off

        return new EmbeddedDatabaseBuilder()
                //.generateUniqueName(true)
                .setName("oauth2")
                .setType(EmbeddedDatabaseType.H2)
                .setScriptEncoding("UTF-8")
                .addScript("classpath:oauth2-authorization-schema.sql")
                .addScript("classpath:oauth2-authorization-consent-schema.sql")
                .addScript("classpath:oauth2-registered-client-schema.sql")
                .addScript("classpath:oauth2-user-authority-schema.sql")
                .addScript("classpath:oauth2-user-authority-data.sql")
                .build();
        // @formatter:on
    }

}
