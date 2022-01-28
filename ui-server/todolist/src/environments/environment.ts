// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  todoResourceServerUrl: 'http://localhost:8090/todo-server',
  clientServer: 'http://localhost:8080',
  oauth2server: 'http://localhost:8083/auth',
  userResourceServer: 'http://localhost:8091/user-server',
  keycloakLogout: 'http://localhost:8083/auth/realms/SpringBootKeycloak/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/login',
  loginUrl: 'http://localhost:8080/login?redirect=http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
