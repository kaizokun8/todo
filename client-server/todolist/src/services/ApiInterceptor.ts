import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {observable, Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {SHOULD_NOT_HANDLE_OAUTH2_SECURITY, SHOULD_NOT_HANDLE_ERROR} from "./Context";
import {UserService} from "./user.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("intercept")

    if (req.context.get(SHOULD_NOT_HANDLE_OAUTH2_SECURITY)) {
      console.log("do not add token")
      return next.handle(req);
    }

    console.log("add token")

    return this.userService.getToken().pipe(
      switchMap((token) => {
        console.log("adding token : "+token)
        const clone = req.clone({setHeaders: {'Authorization': `bearer ${token}`}})
        return next.handle(clone);
      }));

  }

}
