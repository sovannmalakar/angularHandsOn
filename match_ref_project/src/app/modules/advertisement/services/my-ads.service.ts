import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';

import { MyAdvertisementModel } from './../../../core/model/my-advertisement.model';

@Injectable({
  providedIn: 'root'
})
export class MyAdsService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public getAdList(getAdListReq): Observable<ReturnModel<MyAdvertisementModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .getWithParams<MyAdvertisementModel>(environment.baseUrl + '/api/partner/myads', getAdListReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  public saveAd(saveAdReq): Observable<ReturnModel<MyAdvertisementModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .post<MyAdvertisementModel>(environment.baseUrl + '/api/partner/addadvertisement', saveAdReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }
}
