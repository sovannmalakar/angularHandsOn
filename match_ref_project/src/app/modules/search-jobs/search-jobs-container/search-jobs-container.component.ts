import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../../app.service';
import { AppApiService } from '../../../core/services/app-api.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SearchJobsService } from './../services/search-jobs.service';
import { JobSearchCriteria } from './../../../core/model/search/job-search-criteria.model';
import { first } from 'rxjs/operators';
import { SubmitReplyService } from './../services/submit-reply.service';
import { GlobalsService } from './../../../shared/globals.service';

import { ToastrService } from 'ngx-toastr';

import { ZipCodeModel } from '../../../core/model/zip-code.model';

import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/toPromise';

import { JobSearchResultModel } from './../../../core/model/Job-search-result.model';
import { SessionService } from '../../../core/services/session.service';


const now = new Date();

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-search-jobs-container',
  templateUrl: './search-jobs-container.component.html',
  styleUrls: ['../../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
  '../../../../vendor/styles/pages/clients.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss'],
})
export class SearchJobsContainerComponent implements OnInit, OnDestroy {

  selected: any = null;
  sideboxOpened = false;
  services = [];
  refreshMap = true;
  markerData;
  isLoading = false;

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


  searchSettings: any;
  ssDropDownModel: number[];

  reply = {
    adGuid : '',
    message : ''
  };

  keyword = 'cityName';
  locationData: ZipCodeModel;


  baseSearchRequest = this.global.baseSearchReq;

  defaultRequest = {
    maxAllowedMiles: 100,
    location: this.sessionService.currentUserValue.userCity,
    latitude: this.sessionService.currentUserValue.userLatitude,
    longitude: this.sessionService.currentUserValue.userLongitude,
    productGuids: []
  };

  requestModel: JobSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};

  cloneDefaultRequest;
  clonebaseSearchRequest;
  cloneRequestModel;

  displayMonths = 1;
  navigation = 'select';
  disabled = false;

  miles = [
    {value : 1 , label: 'Within 1 Mile'},
    {value : 2 , label: 'Within 2 Miles'},
    {value : 5 , label: 'Within 5 Miles'},
    {value : 10 , label: 'Within 10 Miles'},
    {value : 25 , label: 'Within 25 Miles'},
    {value : 50 , label: 'Within 50 Miles'},
    {value : 100 , label: 'Within 100 Miles'},
    {value : null , label: 'No Limits'}
  ];


 clientsData: JobSearchResultModel;
  modalTitle = '';

  collectionSize;
  constructor(
     private appService: AppService,
     private appApiService: AppApiService,
     private searchJobsService: SearchJobsService,
     private modalService: NgbModal,
     private toastr: ToastrService,
     private submitReplyService: SubmitReplyService,
     private global: GlobalsService ,
     private ngbDateParserFormatter: NgbDateParserFormatter,
     private sessionService: SessionService
     ) {
      this.global.setPageTitleValue('Search Jobs');
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
  selectClient(client) {
    this.selected = client;
    this.sideboxOpened = true;
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }

  ngOnInit() {
    this.searchJobs();
  }

  ssDropDownModelChanged (e) {
    this.requestModel.productGuids = e;
    this.searchJobs();
  }

  milesChanged (e) {
    this.requestModel.maxAllowedMiles = e;
    this.searchJobs();
  }

  pageChanged (e) {
    this.requestModel.page = e;
    this.searchJobs();
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
    this.requestModel.latitude = item.latitude;
    this.requestModel.longitude = item.longitude;
    this.searchJobs();
  }

   onFromDateSelect(date) {
    this.requestModel.fromDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '' ;
    this.searchJobs();
  }

   onToDateSelect(date) {
    this.requestModel.toDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '' ;
    this.searchJobs();
  }

  searchJobs() {
    this.searchJobsService.searchJobs(this.requestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
         this.collectionSize = result.totalRecords;
         this.refreshMap = false;
        setTimeout(() => {
          this.refreshMap = true;
        }, 100);
        this.markerData = this.clientsData;
        this.markerData = this.markerData.map ((f) => {
          return {jobName: f.jobName ,
             latitude: f.latitude ,
              longitude : f.longitude,
               city: f.locationCity,
              state: f.locationState,
              address: f.locationAddress1,
              country: f.locationCountry,
              zip: f.locationZip,
              company: f.advertiserPartnerCompanyName,
              type: 'job'
            };
        });
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  resetJobs() {
    this.defaultRequest = this.cloneDefaultRequest;
    this.baseSearchRequest = this.clonebaseSearchRequest;
    this.ssDropDownModel = [];
    this.requestModel = {...this.defaultRequest , ...this.baseSearchRequest};
    this.baseSearchRequest.fromDate = '';
    this.baseSearchRequest.toDate = '';
    this.requestModel.fromDate = '';
    this.requestModel.toDate = '';
    this.searchJobs();
  }

  openModalForReply(content, options ) {
    this.reply.adGuid = options.data.advertisementGuid;
    this.modalTitle = options.data.jobName ? options.data.jobName : '' ;
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
    this.submitReplyService.submitReply(this.reply)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.toastr.success('Reply has been submitted successfully!');
      }
      this.reply.message  = '';
      this.modalService.dismissAll();
    },
    error => {
      this.reply.message  = '';
      this.modalService.dismissAll();
      this.toastr.error(error.friendlyMessage);
    });
  }

  onFocused(e) {
    // do something when input is focused
  }

  ngOnDestroy () {
    this.global.baseSearchReq = this.clonebaseSearchRequest;
  }
}
