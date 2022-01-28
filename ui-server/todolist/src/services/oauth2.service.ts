import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SHOULD_NOT_HANDLE_OAUTH2_SECURITY} from "./Context";

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.oauth2server;

}
