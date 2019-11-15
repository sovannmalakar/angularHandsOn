import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { ReturnModel } from '../../core/model/return.model';
import { LoggedInUserModel } from '../../core/model/logged-in-user.model';
import { LoginModel } from '../../core/model/login.model';
import { PartnerSignupModel } from './../../core/model/partner-signup.model';
import { map } from 'rxjs/operators';
import { SessionService } from './../../core/services/session.service';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService,
    private sessionService: SessionService) { }

  public userLogin(loginModel: LoginModel): Observable<ReturnModel<LoggedInUserModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.getWithParams<LoggedInUserModel>(environment.baseUrl + '/api/account/login', loginModel)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.isSuccess) {
          if (user.model && user.model.token) {
            localStorage.setItem('currentUser', JSON.stringify(user.model));
            this.sessionService.setCurrentUserValue(user.model);
          }
          // store user details and jwt token in local storage to keep user logged in between page refreshes

        } else {
          throw user.errorHolder;
        }

        return user;
      }),
      );
  }

  public userRegister(registrationModel): Observable<ReturnModel<LoggedInUserModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.post<LoggedInUserModel>(environment.baseUrl + '/api/account/signup', registrationModel)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.isSuccess) {
          if (user.model && user.model.token) {
            localStorage.setItem('currentUser', JSON.stringify(user.model));
            this.sessionService.setCurrentUserValue(user.model);
          }
          // store user details and jwt token in local storage to keep user logged in between page refreshes

        } else {
          throw user.errorHolder;
        }

        return user;
      }));
  }


}
