import { Injectable } from '@angular/core';
import { FrameworkHttpClientService } from './../../../core/http/framework-http-client.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { map } from 'rxjs/operators';
import { ReturnModel } from './../../../core/model/return.model';
import { MyContactModel } from './../../../core/model/my-contact.model';
import { MyContactRequest } from '../../../core/model/my-contact-request';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private frameworkHttpClientService: FrameworkHttpClientService) { }

  public getMyContacts(myContactsReq): Observable<ReturnModel<MyContactModel>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .getWithParams<MyContactModel>(environment.baseUrl + '/api/partner/mycontacts', myContactsReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

  public getMyContactsRequests(myContactsRequestReq): Observable<ReturnModel<MyContactRequest>> {
    // tslint:disable-next-line:max-line-length
    return this.frameworkHttpClientService
               .getWithParams<MyContactRequest>(environment.baseUrl + '/api/partner/requestcontactconnectionlist', myContactsRequestReq)
               .pipe(map(result => {
                if (result && result.isSuccess) {
                  return result;
                 } else {
                  throw result.errorHolder;
                 }
                }));
  }

}
