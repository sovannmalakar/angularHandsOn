import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpRequest} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<import("@angular/common/http").HttpEvent<any>> {
    const token = localStorage.getItem('user_token');
    if(token)
    {
      req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
  }

    return next.handle(req).pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
        console.log("401 error ...");
    }
    return throwError(error);
  }));
}

  constructor( private sessionService: SessionService) { }
}
