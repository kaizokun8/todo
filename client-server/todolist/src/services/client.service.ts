import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SHOULD_NOT_HANDLE_OAUTH2_SECURITY} from "./Context";
import axios from "axios";
import {User} from "../app/model/User";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.clientServer;

  getToken(): Observable<string> {

    const context = new HttpContext().set(SHOULD_NOT_HANDLE_OAUTH2_SECURITY, true);

    return this.http.get<string>(`${this.baseUrl}/token`, {
      context
    });
  }

  getUser(): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/user`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {})
  }

  getTokenPromise(): Promise<{ data: string }> {

    return axios.get(`${this.baseUrl}/token`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
  }

}
