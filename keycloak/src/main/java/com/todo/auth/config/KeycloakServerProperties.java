package com.todo.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "keycloak.server")
public class KeycloakServerProperties {

    String contextPath = "/auth";

    String realmImportFile = "todo-realm.json";

    AdminUser adminUser = new AdminUser();

    public String getContextPath() {
        return contextPath;
    }

    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }

    public AdminUser getAdminUser() {
        return adminUser;
    }

    public void setAdminUser(AdminUser adminUser) {
        this.adminUser = adminUser;
    }

    public String getRealmImportFile() {
        return realmImportFile;
    }

    public void setRealmImportFile(String realmImportFile) {
        this.realmImportFile = realmImportFile;
    }

    public static class AdminUser {

        String username = "admin";

        String password = "admin";

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            System.out.println("username : " + username);
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            System.out.println("password : " + password);
            this.password = password;
        }
    }
}
