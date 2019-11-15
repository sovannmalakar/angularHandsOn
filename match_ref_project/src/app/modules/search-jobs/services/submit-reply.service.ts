import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { SessionService } from './../../../core/services/session.service';
import { ReturnModel } from './../../../core/model/return.model';
import { MyAdvertisementApplicationMessageModel } from './../../../core/model/my-advertisement-application-message.model';

@Injectable({
  providedIn: 'root'
})
export class SubmitReplyService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public submitReply(submitReplyReq): Observable<ReturnModel<MyAdvertisementApplicationMessageModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.post<MyAdvertisementApplicationMessageModel>(environment.baseUrl + '/api/partner/replytoadvertisement', submitReplyReq)
      .pipe(map(result => {
        if (!result.isSuccess) {
            throw result.errorHolder;
        }
        return result;
      }));
  }
}
