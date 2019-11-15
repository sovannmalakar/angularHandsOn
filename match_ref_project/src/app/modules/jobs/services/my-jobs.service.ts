import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';

import { MyJobModel } from './../../../core/model/my-Job.model';

@Injectable({
  providedIn: 'root'
})
export class MyJobsService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public getMyJobList(getMyJobListReq): Observable<ReturnModel<MyJobModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .getWithParams<MyJobModel>(environment.baseUrl + '/api/partner/myjobs', getMyJobListReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }
}
