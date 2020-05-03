import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, finalize } from 'rxjs/operators';
import { AuthServicesService } from '../../auth/auth-services.service';

export interface AppResponse {
  status: number;
  message: string;
  data: object;
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServicesService) { }

  // Add authozization token to the request
  private setHeaders(request: HttpRequest<any>) {
    const token = this.authService.getToken;
    console.log("Did we add a token? ", token);
    if (token) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);
    return next.handle(request)
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 0:
                return throwError({ status: error.status, message: "Unable to connect to server, please contact admin" } as AppResponse);

              case 400:
              case 401:
              case 403:
              case 404:
              case 500:
              default:
                return throwError({ status: error.status, message: error.message } as AppResponse);
            }
          } else if (error.error instanceof ErrorEvent) { // Client Side Error
            return throwError({ status: error.status, message: error.error.message } as AppResponse);
          } else {  // Server Side Error
            return throwError({ status: error.status, message: error.error.message } as AppResponse);
          }

        }),
        finalize(() => {
          // do something at the end
        })
      );
  }
}