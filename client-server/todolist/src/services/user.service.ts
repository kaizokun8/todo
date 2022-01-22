import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {SHOULD_NOT_HANDLE_ERROR, SHOULD_NOT_HANDLE_OAUTH2_SECURITY} from "./Context";
import {Oauth2Token} from "../app/dto/Oauth2Token";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.clientServer;

  getToken(): Observable<string> {

    const context = new HttpContext().set(SHOULD_NOT_HANDLE_OAUTH2_SECURITY, true);

    return this.http.get<string>(`${this.baseUrl}/token`, {context,
      withCredentials: true,
      headers:{'Content-Type': 'application/json'}});
  }

  getTokenPromise(): Promise<{data:string}> {

    return axios.get(`${this.baseUrl}/token`,{headers:{'Content-Type': 'application/json'},withCredentials:true})
  }

}
