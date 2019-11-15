import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { ApiService } from './../../../../app/core/services/api.service';
import { AppService } from './../../../../app/app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from '../services/contacts.service';
import { first } from 'rxjs/operators';
import { RequestContactConnectionSearchCriteria } from '../../../core/model/search/request-contact-connection-search-criteria.model';
import { MyContactRequest } from '../../../core/model/my-contact-request';

@Component({
  selector: 'app-my-connection-requests',
  templateUrl: './my-connection-requests.component.html',
  styleUrls: ['./my-connection-requests.component.scss',
    './../../../../vendor/styles/pages/contacts.scss']
})
export class MyConnectionRequestsComponent implements OnInit {

  @ViewChild('fuzzyContactRequest') fuzzyContactRequest;
  viewMode = 'col';
  cloneRequestModel;
  fuzzyInput = '';
  constructor(private apiService: ApiService,
    private contactsService: ContactsService,
    private global: GlobalsService,
    private appService: AppService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService) {
    this.global.setPageTitleValue('My Connection Requests');
  }

  baseSearchRequest = this.global.baseSearchReq;

  defaultRequest = {
  };

  requestModel: RequestContactConnectionSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};
  collectionSize;
  clientsData: MyContactRequest;
  modalTitle = '';
  reply = {
    advertisementReplyMessageGuid: '',
    message: ''
  };

  ngOnInit() {
    this.cloneRequestModel = Object.assign({}, this.requestModel);
    this.getContactsConnectionList();
  }

  getContactsConnectionList () {
    this.contactsService.getMyContactsRequests(this.requestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
         this.collectionSize = result.totalRecords;
         for (let index = 0; index < this.clientsData.length; index++) {
          this.clientsData[ index ].fullName = result.model[index].firstName + ' ' + result.model[index].lastName;
        }
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  onFuzzyContactRequestSearch (data) {
    this.requestModel.keyword = data.fuzzyInput;
    this.getContactsConnectionList();
  }

  resetFuzzyContactRequest () {
    this.fuzzyContactRequest.resetForm();
    this.requestModel = this.cloneRequestModel;
    this.getContactsConnectionList();
  }

  openModalForReply(content, options) {
    this.modalTitle = options.data.firstName ? options.data.firstName : 'User';
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
      return `with: ${reason}`;
    }
  }

  submitReply() {
    this.reply.message = '';
    this.toastr.success('Accepted successfully!');
    this.modalService.dismissAll();
  }

  confirmToConnect(content, options) {
    this.modalTitle = options.data.firstName ? options.data.firstName : 'Contact';
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  submitDisConnect() {
    this.reply.message = '';
    this.toastr.success('Successfully Declined!');
    this.modalService.dismissAll();
  }

  submitIgnore () {
    this.toastr.success('You have Ignored successfully');
    this.modalService.dismissAll();
  }

  navigateToontact() {
    this.router.navigate(['/contacts/']);
  }

}
