import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.oauth2server;

  getUserInfo(): Observable<object> {

    return this.http.get<object>(`${this.baseUrl}/userinfo`, {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }


}
