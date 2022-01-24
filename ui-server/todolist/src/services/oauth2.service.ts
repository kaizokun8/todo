import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.oauth2server;

  logoutUrl = environment.keycloakLogout;

  public logout(): Observable<any> {

    return this.http.get<Observable<any>>(this.logoutUrl);
  }

}
