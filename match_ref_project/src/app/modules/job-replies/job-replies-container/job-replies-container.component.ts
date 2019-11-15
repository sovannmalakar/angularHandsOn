import { Component, OnInit, HostBinding, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from '../../../app.service';
import { AppApiService } from '../../../core/services/app-api.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { JobRepliesService } from './../services/job-replies.service';
import { first } from 'rxjs/operators';
import { SessionService } from './../../../core/services/session.service';
import { JobFollowupsSearchCriteria } from './../../../core/model/search/job-followups-search-criteria.model';
import { JobFollowUpsModel } from './../../../core/model/job-follow-ups.model';
import { IMultiSelectTexts, IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { ZipCodeModel } from '../../../core/model/zip-code.model';
import { SearchJobsService } from './../../search-jobs/services/search-jobs.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-job-replies-container',
  templateUrl: './job-replies-container.component.html',
  styleUrls: ['../../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
  '../../../../vendor/styles/pages/clients.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss']
})
export class JobRepliesContainerComponent implements OnInit, OnDestroy {
  @ViewChild('fuzzyJobsReply') fuzzyJobsReply;
  fuzzyInput = '';
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

  baseSearchRequest = this.global.baseSearchReq;

  defaultRequest = {
    AdvertisementGuid: '',
    location: this.sessionService.currentUserValue.userCity,
    latitude: this.sessionService.currentUserValue.userLatitude,
    longitude: this.sessionService.currentUserValue.userLongitude,
    productGuids: []
  };

  requestModel: JobFollowupsSearchCriteria = {...this.defaultRequest , ...this.baseSearchRequest};
  cloneDefaultRequest;
  clonebaseSearchRequest;
  cloneRequestModel;

  constructor(private appService: AppService,
     private appApiService: AppApiService,
      private global: GlobalsService,
      private jobRepliesService: JobRepliesService,
      private sessionService: SessionService,
      private ngbDateParserFormatter: NgbDateParserFormatter,
      private searchJobsService: SearchJobsService) {
    this.global.setPageTitleValue('Job Follow-Ups');
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
  clientsData: JobFollowUpsModel;
  selected: any = null;
  sideboxOpened = false;
  services = [];

  FromDateModel: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

  ToDateModel: NgbDateStruct = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };

  displayMonths = 1;
  navigation = 'select';
  disabled = false;



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


selectLocation(item) {
this.requestModel.location = item.cityName;
this.requestModel.latitude = item.latitude;
this.requestModel.longitude = item.longitude;
this.getListData();
}

  selectClient(client) {
    this.selected = client;
    this.sideboxOpened = true;
  }

  closeSidebox() {
    this.sideboxOpened = false;
  }
  ngOnInit() {
    this.getListData();
  }

  pageChanged (e) {
    this.requestModel.page = e;
    this.getListData();
  }

  onFuzzyJobReplySearch (data) {
    this.requestModel.keyword = data.fuzzyInput;
    this.getListData();
  }

  getListData() {
    console.log(this.requestModel);
    this.jobRepliesService.getJobReplies(this.requestModel).pipe(first())
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

  resetAdReplies() {
    this.defaultRequest = this.cloneDefaultRequest;
    this.baseSearchRequest = this.clonebaseSearchRequest;
    this.ssDropDownModel = [];
    this.requestModel = {...this.defaultRequest , ...this.baseSearchRequest};
    this.baseSearchRequest.fromDate = '';
    this.baseSearchRequest.toDate = '';
    this.requestModel.fromDate = '';
    this.requestModel.toDate = '';
    this.fuzzyJobsReply.resetForm();
    this.getListData();
  }

   // onDateChange(date: NgbDateStruct) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
  // }

  // isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  // isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  // isFrom = date => equals(date, this.fromDate);
  // isTo = date => equals(date, this.toDate);

  handleAddressChange(address) {
  }

  onFocused(e) {
    // do something when input is focused
  }

  ngOnDestroy () {
    this.global.baseSearchReq = this.clonebaseSearchRequest;
  }

}
