import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';

import { JobFollowUpsModel } from './../../../core/model/job-follow-ups.model';


@Injectable({
  providedIn: 'root'
})
export class JobRepliesService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }
    public getJobReplies(getMyJobRepliesReq): Observable<ReturnModel<JobFollowUpsModel>> {
      // tslint:disable-next-line:max-line-length
      return this.frameworkHttpClientService
                 .getWithParams<JobFollowUpsModel>(environment.baseUrl + '/api/partner/myjobreplies', getMyJobRepliesReq)
                 .pipe(map(result => {
                  if (result && result.isSuccess) {
                    return result;
                   } else {
                    throw result.errorHolder;
                   }
                  }));
    }
}
