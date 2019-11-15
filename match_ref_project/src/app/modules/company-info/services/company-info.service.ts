import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';

import { PartnerProfileModel } from './../../../core/model/partner-profile.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  getUserInfo (): Observable<ReturnModel<PartnerProfileModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .get<PartnerProfileModel>(environment.baseUrl + '/api/partner/getpartnerinformation')
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  updateUserInfo (updateUserData): Observable<ReturnModel<PartnerProfileModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .post<PartnerProfileModel>(environment.baseUrl + '/api/partner/updatepartnerinformation', updateUserData)
               .pipe(map(result => {
                 if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }
}
