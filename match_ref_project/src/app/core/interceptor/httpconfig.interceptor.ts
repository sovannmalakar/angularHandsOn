import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SessionService } from './../services/session.service';

const ignoredUrlFragments = ['ignoreBlockUI'];
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private sessionService: SessionService
        // public errorDialogService: ErrorDialogService
    ) {

     }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token') ;
        const currentUser = this.sessionService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        let canBlock = true;
        for (let index = 0; index < ignoredUrlFragments.length; index++) {
            const element = ignoredUrlFragments[index].toUpperCase();

            if (request.urlWithParams.toUpperCase().includes(element)) {
                canBlock = false;
                break;
             }
        }
        if (canBlock) {
            this.blockUI.start();
        }
         // Start blocking
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.blockUI.stop(); // Stop blocking
                    // this.errorDialogService.openDialog(event);
                    // if (!event.body.isSuccess) {
                    //     alert(event.body.errorHolder.friendlyMessage);
                    // }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.blockUI.stop(); // Stop blocking
                if (error.status === 401) {
                    // auto logout if 401 response returned from api
                    this.sessionService.logout();
                    location.reload(true);
                }
                // alert(error.error.message);
                return throwError(error);
            }));
    }
}
