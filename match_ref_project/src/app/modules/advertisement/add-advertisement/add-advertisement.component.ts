import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddAdvertisementModel } from './../../../core/model/add/add-advertisemet.model';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { AppApiService } from '../../../core/services/app-api.service';
import { NgForm } from '@angular/forms';
import { MyAdsService } from '../services/my-ads.service';
import { first } from 'rxjs/operators';
import { ProductModel } from '../../../core/model/product.model';
@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss',
    '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class AddAdvertisementComponent implements OnInit {

  displayMonths = 1;
  navigation = 'select';
  disabled = false;
  @Input() private addAdvertisement: EventEmitter<boolean>;
  @Output() refreshParent = new EventEmitter<string>();
  constructor(private global: GlobalsService,
    private toastr: ToastrService,
    private appApiService: AppApiService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private myAdsService: MyAdsService,
    private modalService: NgbModal
  ) {
    this.global.setPageTitleValue('Add Advertisement'); // ('Add Advertisement') ; // 'Add Advertisement';
    this.appApiService.getAllProductsForSelection().subscribe((data) => {
      this.ssDropDownOptionsOpt = data.model.map(item =>
        ({
          id: item.productGuid,
          name: item.productName
        }));
      this.ssDropDownOptionsReq = data.model.map(item =>
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
    advertiserPartnerCompanyName: '',
    advertiserContactFirstName: '',
    advertiserContactLastName: '',
    jobName: '',
    notes: '',
    startDate: '',
    endDate: '',
    expirationDate: '',
    locationAddress1: '',
    locationAddress2: '',
    locationCity: '',
    locationState: '',
    locationZip: '',
    locationCountry: '',
    status: 1,
    requiredServices: [],
    optionalServices: [],
  };

  requestModel: AddAdvertisementModel = { ...this.defaultRequest };

  ngOnInit() {
    if (this.addAdvertisement) {
      this.addAdvertisement.subscribe(data => {
        // Do something in the childComponent after parent emits the event.
        this.saveAdd();
      });
    }

  }

  saveAdd() {
    console.log(this.defaultRequest);
    this.myAdsService.saveAd(this.defaultRequest).pipe(first())
    .subscribe(result => {
      console.log(result);
      if (result && result.isSuccess) {
        this.toastr.success('Advertisement added successfully');
        this.modalService.dismissAll();
        this.refreshParent.next();
      }
    }, err => {
      if (!err.ok) {
        this.global.showError(err);
      }
    });
  }
  ssDropDownModelOptionalChanged(e) {
    this.defaultRequest.optionalServices = e.map(f => ({productGuid : f , productName : ''}));
  }
  ssDropDownModelRequiredChanged(e) {
    this.defaultRequest.requiredServices = e.map(f => ({productGuid : f , productName : ''}));
  }


  onFromDateSelect(date) {
    this.defaultRequest.startDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '';
  }

  onToDateSelect(date) {
    this.defaultRequest.endDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '';
  }

  onExpiryDateSelect(date) {
    this.defaultRequest.expirationDate = this.ngbDateParserFormatter.format(date) ? this.ngbDateParserFormatter.format(date) : '';
  }

  addAdvertisementToDb(data) {
    console.log(data);
  }

}
