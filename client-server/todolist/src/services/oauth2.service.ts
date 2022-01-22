import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.oauth2server;

}
