import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, observable, Observable, Subscription, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {SHOULD_NOT_HANDLE_OAUTH2_SECURITY, SHOULD_NOT_HANDLE_ERROR} from "./Context";
import {UserService} from "./user.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  tokenPromise!: Promise<{ data: string }> | null;

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log("intercept")

    if (req.context.get(SHOULD_NOT_HANDLE_OAUTH2_SECURITY)) {
      //console.log("do not add token")
      return next.handle(req);
    }
    //si aucune promesse de token n'est sauvegardée
    if (this.tokenPromise == null) {
      //récupère la promesse
      this.tokenPromise = this.userService.getTokenPromise()
        //en cas d'erreur renvoie un token vide
        .catch(() => ({data: ''}))
        //une fois le token obtenu supprime la promesse sauvegardée
        .finally(() => this.tokenPromise = null);
    }
    //crée un observable à partir de la promesse.
    //si plusieurs requetes se font de manière simultanée, la même promesse sera partagée
    //évitant de récuperer le token coté serveur à chaque fois.
    return from(this.tokenPromise).pipe(
      switchMap((rs) => {
        //console.log("adding token for request : " + req.url + " " + rs.data)
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
