import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';
import { MyContactModel } from './../../../core/model/my-contact.model';
import { DashboardModel } from '../../../core/model/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public getDashboardData(): Observable<ReturnModel<DashboardModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .get<DashboardModel>(environment.baseUrl + '/api/partner/dashboard')
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }
}
