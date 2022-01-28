import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {UserService} from "./user.service";
import {Injectable} from "@angular/core";
import {ClientService} from "./client.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.getUserConnected().pipe(switchMap((rs) => of(true))) || this.router.parseUrl('login');
  }

}
