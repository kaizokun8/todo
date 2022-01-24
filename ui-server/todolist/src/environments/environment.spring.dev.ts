// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  todoResourceServerUrl: 'http://localhost:8090/todo-server',
  clientServer: 'http://localhost:8080',
  oauth2server: 'http://localhost:8083/auth',
  userResourceServer: 'http://localhost:8091/user-server',
  keycloakLogout: 'http://localhost:8083/auth/realms/SpringBootKeycloak/protocol/openid-connect/logout'
};
