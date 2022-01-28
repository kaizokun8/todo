import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {SHOULD_NOT_HANDLE_OAUTH2_SECURITY} from "./Context";
import axios from "axios";
import {User} from "../app/model/User";
import {ConnectedUser} from "../app/dto/ConnectedUser";

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

  logout(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/logout`)
  }

  getTokenPromise(): Promise<{ data: string }> {

    return axios.get(`${this.baseUrl}/token`, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
  }


}
