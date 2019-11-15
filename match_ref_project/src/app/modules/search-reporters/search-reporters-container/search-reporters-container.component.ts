import { Component, OnInit, HostBinding, ViewChild, OnDestroy } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppApiService } from '../../../core/services/app-api.service';
import { SearchReportersService } from './../services/search-reporters.service';
import { ReporterSearchCriteria } from './../../../core/model/search/reporter-search-criteria.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { FormControl, ɵangular_packages_forms_forms_f } from '@angular/forms';
import { ZipCodeModel } from '../../../core/model/zip-code.model';

import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/toPromise';
import { ReporterSearchResultModel } from '../../../core/model/reporter-search-result.model';
import { BehaviorSubject, Observable } from 'rxjs';
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
  selector: 'app-search-reporters-container',
  templateUrl: './search-reporters-container.component.html',
  styleUrls: ['../../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/styles/pages/clients.scss',
  '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
   '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss']
})
export class SearchReportersContainerComponent implements OnInit, OnDestroy {

  refreshMap = true;
  listView = true;
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
    advertisementReplyMessageGuid : '',
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

  requestModel: ReporterSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};

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
    {value : 0 , label: 'No Limits'}
  ];

  collectionSize;
  itemsPerRow;
  rows;
  constructor(
    private appApiService: AppApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private searchReportersService: SearchReportersService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private global: GlobalsService,
    private sessionService: SessionService
    ) {
      this.global.setPageTitleValue('Search Reporters'); // = 'search Reporters';
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
  @HostBinding('class') private hostClasses = 'd-flex flex-grow-1 align-items-stretch component-cotainer';

  // @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  selected: any = null;
  sideboxOpened = false;
  isLoading = false;
  clientsData: ReporterSearchResultModel;
  markerData;
  modalTitle = '';
  selectClient(client) {
    this.selected = client;
    this.sideboxOpened = true;
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }
  ngOnInit() {
   // this.getLocationAutoComplete();
    this.searchReporters();
  }

  ssDropDownModelChanged (e) {
    this.requestModel.productGuids = e;
    this.searchReporters();
  }

  milesChanged (e) {
    this.requestModel.maxAllowedMiles = e;
    this.searchReporters();
  }

  pageChanged (e) {
    this.requestModel.page = e;
    this.searchReporters();
  }

  onChangeSearch(term) {
        if (term !== '') {
          this.isLoading = true;
          this.searchReportersService.getLocationAutoComplete({city: term, ignoreBlockUI: true }).subscribe(
            data => {
               this.locationData = data.model;
               this.isLoading = false;
          });
        }
  }

  selectLocation(item) {
    this.requestModel.latitude = item.latitude;
    this.requestModel.longitude = item.longitude;
    this.requestModel.location = item.cityName;
    this.searchReporters();
  }


   onFromDateSelect(date) {
    this.requestModel.fromDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '' ;
    this.searchReporters();
   }

   onToDateSelect(date) {
    this.requestModel.toDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '' ;
    this.searchReporters();
   }

   searchReporters() {
    this.searchReportersService.searchReporters(this.requestModel)
    .pipe(first())
    .subscribe(result => {
      if (result.isSuccess) {
        this.clientsData = result.model;
        for (let index = 0; index < this.clientsData.length; index++) {
          this.clientsData[ index ].fullName = result.model[index].firstName + ' ' + result.model[index].lastName;
        }
        this.refreshMap = false;
        setTimeout(() => {
          this.refreshMap = true;
        }, 100);
        this.markerData = this.clientsData;
        this.markerData = this.markerData.map ((f) => {
          return {jobName: f.fullName ,
             latitude: f.latitude ,
              longitude : f.longitude,
               city: f.city,
              state: f.state,
              address: f.locationAddress1,
              country: f.locationCountry,
              zip: f.zip,
              company: f.companyName,
              type: 'reporter'
            };
        });
         this.collectionSize = result.totalRecords;
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }

  resetReporters() {
    this.defaultRequest = this.cloneDefaultRequest;
    this.baseSearchRequest = this.clonebaseSearchRequest;
    this.ssDropDownModel = [];
    this.requestModel = {...this.defaultRequest , ...this.baseSearchRequest};
    this.baseSearchRequest.fromDate = '';
    this.baseSearchRequest.toDate = '';
    this.requestModel.fromDate = '';
    this.requestModel.toDate = '';
    this.searchReporters();
  }

  viewChange (type) {
    if (type === 1) {
      this.listView = true;
    } else {
      this.listView = false;
    }
  }


  openModalForReply(content, options ) {
    this.modalTitle = options.data.firstName ? options.data.firstName : 'User' ;
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
    this.toastr.success('Message sent successfully!');
    this.modalService.dismissAll();
  }


  confirmToConnect (content, options) {
    this.modalTitle = options.data.firstName ? options.data.firstName : 'User' ;
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  submitConnect () {
    this.reply.message  = '';
    this.toastr.success('Successfully connected!');
    this.modalService.dismissAll();
  }

  onFocused(e) {
    // do something when input is focused
  }

  ngOnDestroy () {
    this.global.baseSearchReq = this.clonebaseSearchRequest;
  }

}
