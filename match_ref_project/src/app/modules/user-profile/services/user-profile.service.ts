import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';

import {UserProfileModel } from './../../../core/model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  getUserInfo (): Observable<ReturnModel<UserProfileModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .get<UserProfileModel>(environment.baseUrl + '/api/partner/getuserprofile')
               .pipe(map(result => {
                  return result;
                }));
  }

  updateUserInfo (updateUserData): Observable<ReturnModel<UserProfileModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .post<UserProfileModel>(environment.baseUrl + '/api/partner/updateuserprofile', updateUserData)
               .pipe(map(result => {
                  return result;
                }));
  }
}
