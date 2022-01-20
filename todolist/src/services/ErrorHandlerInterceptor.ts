import {ErrorHandler, Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Store} from "@ngrx/store";
import {Notification} from "../app/model/Notification";
import {setNotificationList} from "../app/store/notification/notification.actions";
import {SHOULD_NOT_HANDLE_ERROR} from "./Context";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorHandler: ErrorHandler, private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.context.get(SHOULD_NOT_HANDLE_ERROR)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      // we catch the error
      catchError((errorResponse: HttpErrorResponse) => {
        // if the status is 401 Unauthorized
        if (errorResponse.status === HttpStatusCode.Unauthorized) {
          // we redirect to login
          this.router.navigateByUrl('/login');
        } else if (errorResponse.status === HttpStatusCode.InternalServerError) {

          let notifications: Array<Notification> = [{
            severity: 'error',
            summary: `Internal Server Error`,
            detail: errorResponse.error ? errorResponse.error : `An Internal Server Error occured :  ${errorResponse.message}!`
          }];

          this.store.dispatch(setNotificationList({notifications}))

        } else {
          // else we notify the user
          this.errorHandler.handleError(errorResponse);
        }
        return throwError(() => errorResponse);
      })
    );
  }
}

