import { Component, ViewEncapsulation, OnInit, ViewChild, HostBinding, OnDestroy } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { MyJobsService } from './../services/my-jobs.service';
import { GlobalsService } from './../../../shared/globals.service';
import { MyJobModel } from './../../../../app/core/model/my-Job.model';
import { MyJobSearchCriteria } from './../../../core/model/search/my-job-search-criteria.model';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/toPromise';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppApiService } from '../../../core/services/app-api.service';
import { ZipCodeModel } from '../../../core/model/zip-code.model';

import { SearchJobsService } from './../../search-jobs/services/search-jobs.service';
import { SessionService } from './../../../core/services/session.service';

@Component({
  selector: 'app-jobs-container',
  templateUrl: './jobs-container.component.html',
  styleUrls: ['../../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
  '../../../../vendor/styles/pages/clients.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss']
})
export class JobsContainerComponent implements OnInit,  OnDestroy {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('fuzzyJobs') fuzzyJobs;
  selected: any = null;
  sideboxOpened = false;
  @HostBinding('class') private hostClasses = 'd-flex flex-grow-1 align-items-stretch component-cotainer';




  rows = [];
  temp = [];

  fuzzyInput = '';
  displayMonths = 1;
  disabled = '';
  navigation = 'select';

  reply = {
    advertisementReplyMessageGuid : '',
    message : ''
  };

  modalTitle = '';
  clientsData: MyJobModel;

  ssDropDownSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-secondary',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: true,
    showUncheckAll: true,
    fixedTitle: false,
    dynamicTitleMaxItems: 0,
    maxHeight: '300px',
    isLazyLoad: true,
    loadViewDistance: 1,
    stopScrollPropagation: true,
    selectAddedValues: true
  };

  ssDropDownTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Loading...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select Service',
    allSelected: 'All selected',
  };

  loadingTexts:  IMultiSelectTexts = Object.assign({}, this.ssDropDownTexts);
  noresultTexts:  IMultiSelectTexts = Object.assign({}, this.ssDropDownTexts);

  ssDropDownOptions: IMultiSelectOption[];
  initLoadNum = 20;
  ssDropDownModel: number[];
  collectionSize;
  isLoading = false;

  keyword = 'cityName';
  locationData: ZipCodeModel;

  constructor(
    private modalService: NgbModal,
    private toaster: ToastrService,
    private myJobsService: MyJobsService,
    private global: GlobalsService,
    private appApiService: AppApiService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private searchJobsService: SearchJobsService,
    private sessionService: SessionService
  ) {
    this.global.setPageTitleValue('My Jobs');
    this.appApiService.getAllProductsForSelection().subscribe((data) => {
      this.ssDropDownOptions = data.model.map(item =>
        ({
                id: item.productGuid,
                name : item.productName
          }));
    });
  this.cloneDefaultRequest = Object.assign({}, this.defaultRequest);
  this.clonebaseSearchRequest = Object.assign({} , this.baseSearchRequest);
  this.cloneRequestModel = Object.assign({}, this.requestModel);
   }

   baseSearchRequest = this.global.baseSearchReq;

  defaultRequest = {
    location: this.sessionService.currentUserValue.userCity,
    latitude: this.sessionService.currentUserValue.userLatitude,
    longitude: this.sessionService.currentUserValue.userLongitude,
    maxAllowedMiles: 1000,
    partnerGuid: '',
    showCompleted: false,
    productGuids: []
  };

  requestModel: MyJobSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};
  cloneDefaultRequest;
  clonebaseSearchRequest;
  cloneRequestModel;


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onChangeSearch(term) {
    if (term !== '') {
      this.isLoading = true;
      this.searchJobsService.getLocationAutoComplete({city: term , ignoreBlockUI: true }).subscribe(
        data => {
           this.locationData = data.model;
           this.isLoading = false;
      });
    }
}

selectLocation(item) {
this.requestModel.location = item.cityName;
this.requestModel.latitude = item.latitude;
this.requestModel.longitude = item.longitude;
this.getListData();
}

  ngOnInit() {
    this.getListData();
  }

  pageChanged (e) {
    this.requestModel.page = e;
    this.getListData();
  }

  onFuzzyJobSearch (data) {
    this.requestModel.keyword = data.fuzzyInput;
    this.getListData();
  }

  ssDropDownModelChanged (e) {
    this.requestModel.productGuids = e;
    this.getListData();
  }

  onFromDateSelect(date) {
    this.requestModel.fromDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '' ;
    this.getListData();
  }

   onToDateSelect(date) {
    this.requestModel.toDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '' ;
    this.getListData();
  }

  getListData () {
    this.myJobsService.getMyJobList(this.requestModel).pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
         this.collectionSize = result.totalRecords;
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  reseAds() {
    this.defaultRequest = this.cloneDefaultRequest;
    this.baseSearchRequest = this.clonebaseSearchRequest;
    this.ssDropDownModel = [];
    this.requestModel = {...this.defaultRequest , ...this.baseSearchRequest};
    this.fuzzyJobs.resetForm();
    this.global.baseSearchReq = this.clonebaseSearchRequest;
    this.getListData();
  }


  errorHandle () {
    this.toaster.error(this.global.defaultErrorMessage);
  }

  onActivate(event) {
    if (event.type === 'click') {
      // this.modalTitle = event.row.orderingContactFirstName + ' ' + event.row.orderingContactLastName;
  }
  }

  openModalForReply(content, options ) {
    // this.modalTitle = options.data.orderingContactFirstName ? options.data.orderingContactFirstName : 'User' ;
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
    this.reply.message  = '';
    this.toaster.success('Message sent successfully!');
    this.modalService.dismissAll();
  }


  confirmToConnect (content, options) {
    this.modalTitle = options.data.jobName ? options.data.jobName : 'User' ;
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  submitChangedStatus () {
    this.reply.message  = '';
    this.toaster.success('Status Changed Successfully');
    this.modalService.dismissAll();
  }

  selectClient(client) {
    this.selected = client;
    this.sideboxOpened = true;
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }

  onFocused(e) {
    // do something when input is focused
  }

  ngOnDestroy () {
    this.global.baseSearchReq = this.clonebaseSearchRequest;
  }
}
