import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, observable, Observable, Subscription, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {SHOULD_NOT_HANDLE_OAUTH2_SECURITY, SHOULD_NOT_HANDLE_ERROR} from "./Context";
import {ClientService} from "./client.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  tokenPromise!: Promise<{ data: string }> | null;

  constructor(private userService: ClientService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.context.get(SHOULD_NOT_HANDLE_OAUTH2_SECURITY)) {

      return next.handle(req);
    }
    //si no promise is saved
    if (this.tokenPromise == null) {
      //retrieve the promise
      this.tokenPromise = this.userService.getTokenPromise()
        //return a empty token in case there is an error
        .catch(() => ({data: ''}))
        //one the token is retrieved the promise is removed
        .finally(() => this.tokenPromise = null);
    }
    //create an observable from the promise.
    //if several request happen simultaneously, the same promise will be shared.
    return from(this.tokenPromise).pipe(
      switchMap((rs) => {
        const clone = req.clone({setHeaders: {'Authorization': `bearer ${rs.data}`}})
        return next.handle(clone);
      }));

    /*
    return this.userService.getToken().pipe(
      switchMap((token) => {
        //console.log("adding token : "+token)
        const clone = req.clone({setHeaders: {'Authorization': `bearer ${token}`}})
        return next.handle(clone);
      }));
*/
  }

}
