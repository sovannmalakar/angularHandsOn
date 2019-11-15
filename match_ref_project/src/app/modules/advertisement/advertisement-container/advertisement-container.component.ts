import { Component, OnInit, HostBinding, ViewChild, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MyAdsService } from './../services/my-ads.service';
import { first } from 'rxjs/operators';
import { GlobalsService } from '../../../shared/globals.service';
import { MyAdvertisementModel } from './../../../core/model/my-advertisement.model';

import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/toPromise';

import { ToastrService } from 'ngx-toastr';
import { AppApiService } from '../../../core/services/app-api.service';
import { NgbDateParserFormatter, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-advertisement-container',
  templateUrl: './advertisement-container.component.html',
  styleUrls: ['../../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss',
  '../../../../vendor/styles/pages/clients.scss',
  '../../../../vendor/libs/ng-select/ng-select.scss',
  '../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss']
})
export class AdvertisementContainerComponent implements OnInit, OnDestroy {
  clientsData: MyAdvertisementModel;
  @ViewChild('fuzzyAd') fuzzyAd;
  fuzzyInput;
  displayMonths = 1;
  navigation = 'select';
  disabled = false;

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
  constructor(private router: Router,
    private toaster: ToastrService  ,
    private appApiService: AppApiService,
    private myAdsService: MyAdsService,
    private global: GlobalsService,
    private modalService: NgbModal,
    private ngbDateParserFormatter: NgbDateParserFormatter) {
      this.global.setPageTitleValue('Advertisements');
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
  private addAdvertisement: EventEmitter<boolean> = new EventEmitter();
  selected: any = null;
  sideboxOpened = false;

  baseSearchRequest = this.global.baseSearchReq;

  defaultRequest = {
    productGuids: [],
    advertisementGuid: ''
  };

  requestModel = {...this.defaultRequest , ...this.baseSearchRequest};
  cloneDefaultRequest;
  clonebaseSearchRequest;
  cloneRequestModel;
  collectionSize;

  selectClient(client) {
    this.selected = client;
    this.sideboxOpened = true;
  }

  onFuzzyAdSearch (data) {
    this.requestModel.keyword = data.fuzzyInput;
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


  closeSidebox() {
    this.sideboxOpened = false;
  }

  ngOnInit() {
    this.getListData();
}

  ssDropDownModelChanged (e) {
    this.requestModel.productGuids = e;
    this.getListData();
  }

  pageChanged (e) {
    this.requestModel.page = e;
    this.getListData();
  }

  refreshParent () {
    this.getListData();
  }
  getListData () {
    this.myAdsService.getAdList(this.requestModel).pipe(first())
    .subscribe(result => {
      console.log(result);
      result.isSuccess ? this.clientsData = result.model : this.errorHandle();
      result.isSuccess ? this.collectionSize = result.totalRecords : this.errorHandle();
    });
  }

  reseAds() {
    this.defaultRequest = this.cloneDefaultRequest;
    this.baseSearchRequest = this.clonebaseSearchRequest;
    this.ssDropDownModel = [];
    this.requestModel = {...this.defaultRequest , ...this.baseSearchRequest};
    this.baseSearchRequest.fromDate = '';
    this.baseSearchRequest.toDate = '';
    this.requestModel.fromDate = '';
    this.requestModel.toDate = '';
    this.fuzzyAd.resetForm();
    this.getListData();
  }

  addAdvertisementNotifier() {
    this.addAdvertisement.emit();
    // this.router.navigate(['advertisement/addAdvertisement']);
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
      this.getListData();
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

  errorHandle () {
    this.toaster.error(this.global.defaultErrorMessage);
  }

  ngOnDestroy () {
    this.global.baseSearchReq = this.clonebaseSearchRequest;
  }

}
