import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/toPromise';
import { AppApiService } from './../../../../core/services/app-api.service';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './service/data.service';


@Component({
  selector: 'app-add',
  providers: [
    DataService
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss',
  '../../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
  '../../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
  '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AddComponent implements OnInit {

  displayMonths = 1;
  navigation = 'select';
  disabled = false;
  @Input() private addAdvertisement: EventEmitter<boolean>;
  @Output() refreshParent = new EventEmitter<string>();
  constructor(
    private appApiService: AppApiService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal,
    private data: DataService
  ) {
    this.appApiService.getAllProductsForSelection().subscribe((data1) => {
      this.ssDropDownOptionsOpt = data1.model.map(item =>
        ({
          id: item.productGuid,
          name: item.productName
        }));
      this.ssDropDownOptionsReq = data1.model.map(item =>
        ({
          id: item.productGuid,
          name: item.productName
        }));
    });
  }

  ssDropDownSettingsOptional: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block btn-secondary first',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: true,
    showUncheckAll: true,
    fixedTitle: false,
    dynamicTitleMaxItems: 2,
    maxHeight: '300px',
    isLazyLoad: true,
    loadViewDistance: 1,
    stopScrollPropagation: false,
    selectAddedValues: true
  };

  ssDropDownSettingsRequired: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block btn-secondary second',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: true,
    showUncheckAll: true,
    fixedTitle: false,
    dynamicTitleMaxItems: 2,
    maxHeight: '300px',
    isLazyLoad: true,
    loadViewDistance: 1,
    stopScrollPropagation: false,
    selectAddedValues: true
  };
  ssDropDownTextsOpt: IMultiSelectTexts = {
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
  ssDropDownTextsReq: IMultiSelectTexts = {
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



  ssDropDownOptionsReq: IMultiSelectOption[];
  ssDropDownOptionsOpt: IMultiSelectOption[];
  initLoadNum = 20;


  searchSettings: any;
  ssDropDownModelOptional: [];
  ssDropDownModelRequired: [];



  defaultRequest = {
    partnerCompanyName: '',
    contactFirstName: '',
    contactLastName: '',
    jobName: '',
   // notes: '',
    startDate: '',
    endDate: '',
    // expirationDate: '',
    // locationAddress1: '',
    // locationAddress2: '',
    // locationCity: '',
    // locationState: '',
    // locationZip: '',
    // locationCountry: '',
    // status: 1,
    // requiredServices: [],
    // optionalServices: [],
  };

  // requestModel: AddAdvertisementModel = { ...this.defaultRequest };

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('dataSource')));
    this.defaultRequest = JSON.parse(localStorage.getItem('dataSource'));
    this.onFromDateSelect(this.defaultRequest.startDate);
    if (this.addAdvertisement) {
      this.addAdvertisement.subscribe(data => {
        // Do something in the childComponent after parent emits the event.
        // this.saveAdd();
      });
    }

  }

  // saveAdd() {
  //   console.log(this.defaultRequest);
  //   this.myAdsService.saveAd(this.defaultRequest).pipe(first())
  //   .subscribe(result => {
  //     console.log(result);
  //     if (result && result.isSuccess) {
  //       alert('Advertisement added successfully');
  //       this.modalService.dismissAll();
  //       this.refreshParent.next();
  //     }
  //   }, err => {
  //     if (!err.ok) {
  //       alert(err);
  //     }
  //   });
  // }
  ssDropDownModelOptionalChanged(e) {
    // this.defaultRequest.optionalServices = e.map(f => ({productGuid : f , productName : ''}));
  }
  ssDropDownModelRequiredChanged(e) {
    // this.defaultRequest.requiredServices = e.map(f => ({productGuid : f , productName : ''}));
  }


  onFromDateSelect(date) {
    this.defaultRequest.startDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '';
  }

  onToDateSelect(date) {
    this.defaultRequest.endDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '';
  }

  onExpiryDateSelect(date) {
   // this.defaultRequest.expirationDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '';
  }

  addAdvertisementToDb() {
    console.log(this.defaultRequest);
  }

}
