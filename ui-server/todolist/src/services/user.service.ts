import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../app/model/User";
import {ConnectedUser} from "../app/dto/ConnectedUser";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  baseUrl = environment.userResourceServer;

  getUserConnected(): Observable<User> {

    return this.http.get<ConnectedUser>(`${this.baseUrl}/users/connected`).pipe(switchMap((connectedUser: ConnectedUser) =>
      of({
        username: connectedUser.preferred_username,
        email: connectedUser.email,
        id: connectedUser.sub,
        password: ''
      })
    ));
  }


}
