import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../app/model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.userResourceServer;

  getUser(): Observable<User> {

    console.log("getUser")

    return this.http.get<User>(`${this.baseUrl}/user`, {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'}
    });
  }


}
