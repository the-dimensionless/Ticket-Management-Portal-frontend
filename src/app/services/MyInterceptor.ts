import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { AuthServicesService } from './../auth/auth-services.service';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private msalService: AuthServicesService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.fromPromise(this.handleAccess(request, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {
        const token = await this.msalService.getToken();
        let changedRequest = request;
        // HttpHeader object immutable - copy values
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }
        if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token;

            headerSettings['Content-Type'] = 'application/json';
            const newHeader = new HttpHeaders(headerSettings);

            changedRequest = request.clone({
                headers: newHeader
            });
            return next.handle(changedRequest).toPromise();
        }
        /*  headerSettings['Content-Type'] = 'application/json';
         const newHeader = new HttpHeaders(headerSettings);
 
         changedRequest = request.clone({
             headers: newHeader
         }); */
        /*  return next.handle(changedRequest).toPromise(); */
        return next.handle(request).toPromise();
    }

}