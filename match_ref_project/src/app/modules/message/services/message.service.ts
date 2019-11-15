import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { ReturnModel } from '../../../core/model/return.model';
import { LoggedInUserModel } from '../../../core/model/logged-in-user.model';
import { LoginModel } from '../../../core/model/login.model';
import { PartnerSignupModel } from './../../../core/model/partner-signup.model';
import { map } from 'rxjs/operators';
import { SessionService } from './../../../core/services/session.service';

import { MessageForOneContactModel } from './../../../core/model/meesage-for-one-contact.model';
import { MessageContactsModel } from './../../../core/model/message-contacts.model';
import { MessageModel } from './../../../core/model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService,
    private sessionService: SessionService) { }

    public getContactList(messageContactsReq): Observable<ReturnModel<MessageContactsModel>> {
      return this.frameworkHttpClientService
               .getWithParams<MessageContactsModel>(environment.baseUrl + '/api/partner/getcontactslistformessage', messageContactsReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
    }

    public getMessageForContact(getMessageForContactReq): Observable<ReturnModel<MessageForOneContactModel>> {
      return this.frameworkHttpClientService
               // tslint:disable-next-line:max-line-length
               .getWithParams<MessageForOneContactModel>(environment.baseUrl + '/api/partner/getmessagesforcontact', getMessageForContactReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
    }

    public sendMessage(sendMessageToContactReq): Observable<ReturnModel<MessageModel>> {
      return this.frameworkHttpClientService
               // tslint:disable-next-line:max-line-length
               .post<MessageModel>(environment.baseUrl + '/api/partner/sendmessage', sendMessageToContactReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
    }
}
