import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../../core/model/login.model';
import { LoginApiService } from './../login-api.service';

import { AppService } from './../../../app.service';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { first } from 'rxjs/operators';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { IReturnModel } from './../../../../app/core/model/i-return.model';
import { ReturnModel } from './../../../../app/core/model/return.model';
import { errorHandler } from '@angular/platform-browser/src/browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../../vendor/styles/pages/authentication.scss',
    '../../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
  ]
})
export class LoginComponent implements OnInit {

  public alerts: Array<IAlert> = [];

  constructor(
    private router: Router,
    private appService: AppService,
    private authenticationService: AuthenticationService,
    private loginApiService: LoginApiService,
    private global: GlobalsService
  ) {
    this.appService.pageTitle = 'YesMatch - Login';
  }

  loading = false;

  credentials: LoginModel = {
    username: '',
    password: '',
    rememberMe: true
  };

  ngOnInit() {
  }

  onUserLogin(val) {
    this.loading = true;
    this.loginApiService.userLogin(this.credentials)
            .pipe(first())
            .subscribe(result => {
              if (result && !result.isSuccess) {
                this.alerts = [];
                const showError = new Error ;
                this.alerts.push({
                  id: 1,
                  type: 'danger',
                  // tslint:disable-next-line:max-line-length
                  message: result.errorHolder  ? result.errorHolder + ' for ' + this.credentials.username + ' or password is incorrect' : this.global.defaultErrorMessage
                });
              }
              this.router.navigate(['/']);
              this.loading = false;
                },
                error => {
                  this.alerts = [];
                  const showError = new Error ;
                  this.alerts.push({
                    id: 1,
                    type: 'danger',
                    // tslint:disable-next-line:max-line-length
                    message: error.friendlyMessage
                  });
                  this.loading = false;
                });
 }

 closeAlert(alert: IAlert) {
  const index: number = this.alerts.indexOf(alert);
  this.alerts.splice(index, 1);
}



}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
