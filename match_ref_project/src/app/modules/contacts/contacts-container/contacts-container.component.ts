import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../../core/services/api.service';
import { GlobalsService } from './../../../shared/globals.service';
import { AppService } from './../../../app.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageRequestModel } from './../../../core/model/message-request.model';

// Services

import { ContactsService } from './../services/contacts.service';

// model

import { BaseSearchCriteria } from './../../../core/model/search/base-search-criteria.model';
import { MyContactSearchCriteria } from './../../../core/model/search/my-contact-search-criteria.model';
import { first } from 'rxjs/operators';
import { MyContactModel } from '../../../core/model/my-contact.model';
import { NgForm } from '@angular/forms';

import { InteractionService } from './../../../shared/services/interaction.service';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-contacts-container',
  templateUrl: './contacts-container.component.html',
  styleUrls: ['./../../../../vendor/styles/pages/contacts.scss']
})
export class ContactsContainerComponent implements OnInit {
  @ViewChild('fuzzyContact') fuzzyContact;
  viewMode = 'col';
  baseSearchRequest = this.global.baseSearchReq;
  cloneRequestModel;
  cloneSendMessageRequestModel;
  defaultRequest = {
  };

  fuzzyInput = '';

  sendMessageRequest:  MessageRequestModel = {
    toPartnerGuid: '',
    message: ''
  };

  requestModel: MyContactSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};
  collectionSize;
  clientsData: MyContactModel;
  constructor(
    private contactsService: ContactsService,
    private global: GlobalsService,
    private appService: AppService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private interactionService: InteractionService) {
      this.global.setPageTitleValue('My Contact List');
     }


     contactsData;
     modalTitle = '';
     reply = {
      advertisementReplyMessageGuid : '',
      message : ''
    };

  ngOnInit() {
    this.cloneSendMessageRequestModel = Object.assign({}, this.sendMessageRequest);
    this.cloneRequestModel = Object.assign({}, this.requestModel);
     this.getContactsList();
  }

  onFuzzyContactSearch (data) {
    this.requestModel.keyword = data.fuzzyInput;
    this.getContactsList();
  }

  resetFuzzyContact () {
    this.fuzzyContact.resetForm();
    this.requestModel = this.cloneRequestModel;
    this.getContactsList();
  }

  getContactsList() {
    this.contactsService.getMyContacts(this.requestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
         this.collectionSize = result.totalRecords;
         for (let index = 0; index < this.clientsData.length; index++) {
          this.clientsData[ index ].fullName = result.model[index].contactFirstName + ' ' + result.model[index].contactLastName;
        }
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  openModalForReply(content, options ) {
    this.sendMessageRequest.toPartnerGuid = options.data.partnerGuid;
    this.modalTitle = options.data.contactFirstName ? options.data.contactFirstName : 'User' ;
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  submitReply () {
    if (this.reply.message && this.reply.message !== '') {
      this.sendMessageRequest.message = this.reply.message;
      this.interactionService.sendMessageToMyContact(this.sendMessageRequest)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.reply.message  = '';
        this.toastr.success('Message sent successfully!');
        this.modalService.dismissAll();
        this.sendMessageRequest = this.cloneSendMessageRequestModel;
      }
    }, err => {
      if (!err.ok) {
        this.toastr.error(err.friendlyMessage);
        this.sendMessageRequest = this.cloneSendMessageRequestModel;
      }
    });
    } else {
      this.toastr.warning('Please Write some message');
    }
  }


  confirmToConnect (content, options) {
    this.modalTitle = options.data.contactFirstName ? options.data.contactFirstName : 'Contact' ;
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  submitDisConnect () {
    this.reply.message  = '';
    this.toastr.success('Successfully Disconnected!');
    this.modalService.dismissAll();
  }



  goToCardDetail (contact) {
    this.router.navigate(['/contacts/' + contact.partnerGuid]);
  }

  goToMyConnectionRequests () {
     this.router.navigate(['/myConnectionRequests/connectioRequests/']);
  }

  pageChanged(e) {
    this.requestModel.page = e;
    this.getContactsList();
  }

}
