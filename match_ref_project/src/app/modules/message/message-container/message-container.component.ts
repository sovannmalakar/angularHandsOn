import { Component, OnInit, HostBinding } from '@angular/core';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { MessageService } from '../services/message.service';

import { MessageContactSearchCriteria } from './../../../core/model/search/message-contacts-search-criteria.model';
import { first } from 'rxjs/internal/operators/first';

import { MessageForOneContactSearchCriteria } from './../../../core/model/search/message-for-one-contact-search-criteria.model';
import { MessageRequestModel } from './../../../core/model/message-request.model';
import { SessionService } from '../../../core/services/session.service';
@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./../../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
  './../../../../vendor/styles/pages/chat.scss']
})
export class MessageContainerComponent implements OnInit {
  messageText = '';

  baseSearchRequest = this.global.baseSearchReq;

  activeContactGuid;

  constructor(private global: GlobalsService,
    private messageService: MessageService,
    private sessionService: SessionService) {
    this.global.setPageTitleValue('My Messages');
   }

   rawMessageData ;

   // chatData;

   requestModel: MessageContactSearchCriteria = { ...this.baseSearchRequest};

   getMessageRequestModel: MessageForOneContactSearchCriteria = { ...this.baseSearchRequest} ;

   sendMessageRequestModel: MessageRequestModel;

  @HostBinding('class') private hostClasses = 'd-flex flex-grow-1 align-items-stretch ';

  sideboxOpen = false;

  user = {
    avatar: '1-small.png'
  };

  contactsData;

//  contactsData  = [
//     { avatar: '12-small.png', name: 'Arthur Duncan', username: 'aduncan', online: false, newMessages: 0 },
//     { avatar: '5-small.png', name: 'Nellie Maxwell', username: 'nmaxwell', online: true, newMessages: 2 },
//     { avatar: '9-small.png', name: 'Amanda Warner', username: 'awarner', online: false, newMessages: 0 },
//     { avatar: '6-small.png', name: 'Mae Gibson', username: 'mgibson', online: true, newMessages: 0 },
//     { avatar: '2-small.png', name: 'Leon Wilson', username: 'lwilson', online: true, newMessages: 5 },
//     { avatar: '7-small.png', name: 'Alice Hampton', username: 'ahampton', online: false, newMessages: 0 },
//     { avatar: '8-small.png', name: 'Hallie Lewis', username: 'hlewis', online: false, newMessages: 1 },
//     { avatar: '4-small.png', name: 'Kenneth Frazier', username: 'kfrazier', online: true, newMessages: 0 },
//     { avatar: '10-small.png', name: 'Wayne Morgan', username: 'wmorgan', online: false, newMessages: 0 },
//     { avatar: '3-small.png', name: 'Allie Rodriguez', username: 'arodriguez', online: true, newMessages: 0 },
//     { avatar: '11-small.png', name: 'Belle Ross', username: 'bross', online: false, newMessages: 0 }
//   ];

  chatData = {
    user: 'kfrazier',
    status: 'Typing...',
    messages: [
      { you: true, text: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.', date: '2:33 am' },
      { you: false, text: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.', date: '2:34 am' },
      { you: true, text: 'Cum ea graeci tractatos.', date: '2:35 am' },
      // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
      { you: false, text: 'Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.', date: '2:36 am' },
      { you: false, text: 'Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.', date: '2:37 am' },
      { you: true, text: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.', date: '2:38 am' },
      { you: false, text: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.', date: '2:39 am' },
      { you: true, text: 'Cum ea graeci tractatos.', date: '2:40 am' },
      // tslint:disable-next-line:max-line-length
      { you: true, text: 'Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.', date: '2:41 am' },
      // tslint:disable-next-line:max-line-length
      { you: false, text: 'Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.', date: '2:42 am' },
      { you: true, text: 'Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.', date: '2:43 am' },
      { you: false, text: 'Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.', date: '2:44 am' }
    ]
  };

  get chatUser() {
    if (this.sessionService.currentUserValue) {
      // tslint:disable-next-line:max-line-length
      this.sessionService.currentUserValue['fullName'] = this.sessionService.currentUserValue.firstName + ' ' + this.sessionService.currentUserValue.lastName;
      return this.sessionService.currentUserValue;
    }
    // if (this.contactsData) {
    //   for (let i = 0, l = this.contactsData.length; i < l; i++) {
    //     if (this.contactsData[i]['username'] === this.chatData['user']) {
    //       return this.contactsData[i];
    //     }
    //   }
    // }
  }

  get chatContacts() {
    if (this.contactsData) {
      //
    // Sort contacts (online then offline)
    //
    return [].concat(
      // Online
      this.contactsData.reduce((c, i) => {
        if (i['online']) { c['push'](i); }
        return c;
      }, [])['sort'](function (a, b) {
        const nameA = a.fullName.toUpperCase();
        const nameB = b.fullName.toUpperCase();

        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      })
    ).concat(
      // Offline
      this.contactsData.reduce((c, i) => {
        if (!i['online']) { c['push'](i); }
        return c;
      }, [])['sort'](function (a, b) {
        const nameA = a.fullName.toUpperCase();
        const nameB = b.fullName.toUpperCase();

        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      })
    );
    }
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    const self = this;
    this.messageService.getContactList(this.requestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        console.log(result);
         this.contactsData = result.model;
        //  this.collectionSize = result.totalRecords;
        if (this.contactsData.length > 0 ) {
          for (let index = 0; index < this.contactsData.length; index++) {
            this.contactsData[ index ].fullName = result.model[index].contactFirstName + ' ' + result.model[index].contactLastName;
          }
          const sortArrayByName = this.contactsData.sort(this.compare);
          this.activeContactGuid = sortArrayByName[0].partnerGuid;
          this.getMessageForContacts(sortArrayByName[0] , 1 );
        }
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  compare(a, b) {
    const genreA = a.contactFirstName.toUpperCase();
    const genreB = b.contactFirstName.toUpperCase();
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  getMessageForContacts(data , type) {
    type === 1 ? this.activeContactGuid = {contactGuid : data.partnerGuid} : this.activeContactGuid = {contactGuid : data.toPartnerGuid};
    this.getMessageRequestModel = { ...this.baseSearchRequest , ...this.activeContactGuid} ;
    this.messageService.getMessageForContact(this.getMessageRequestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        console.log(result);
        this.rawMessageData = result.model;
        this.rawMessageData = this.rawMessageData.reverse();
        this.formatChatMessage();
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }


  formatChatMessage () {
    // this.chatData = this.rawMessageData.reverse();
    for (let index = 0; index < this.rawMessageData.length; index++) {
      console.log(this.rawMessageData[index].fromPartnerGuid);
      if (this.rawMessageData[index].fromPartnerGuid === this.sessionService.currentUserValue.partnerGuid) {
        this.rawMessageData[index]['you'] = true;
      } else {
        this.rawMessageData[index]['you'] = false;
      }
    }
  }

  sendMessage(data) {
    const sendMessageRequest = {toPartnerGuid : this.activeContactGuid.contactGuid , message : this.messageText};
    this.sendMessageRequestModel = {  ...sendMessageRequest} ;
    this.messageService.sendMessage(this.sendMessageRequestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.messageText = '';
        console.log(result);
        if (result.model) {
          this.getMessageForContacts(result.model , 2);
        }
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

}
