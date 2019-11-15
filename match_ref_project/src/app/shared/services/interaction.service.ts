import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { SessionService } from './../../core/services/session.service';
import { ReturnModel } from './../../core/model/return.model';
import { MessageModel } from './../../core/model/message.model';
import { MessageRequestModel } from './../../core/model/message-request.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public sendMessageToMyContact(sendMessageToContactReq): Observable<ReturnModel<MessageModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService.post<MessageModel>(environment.baseUrl + '/api/partner/sendmessage', sendMessageToContactReq)
      .pipe(map(result => {
        if (!result.isSuccess) {
            throw result.errorHolder;
        }
        return result;
      }));
  }
}
