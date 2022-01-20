import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes("localhost")) {

      const clone = req.clone({setHeaders: {'Accept-Language': 'fr'}})
      return next.handle(clone);
    }

    return next.handle(req);
  }

}
