import { Injectable } from '@angular/core';
import { BaseSearchCriteria } from '../core/model/search/base-search-criteria.model';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public pageTitleSubject: BehaviorSubject<any>;
  public pageTitle: Observable<any>;
  constructor(private toastr: ToastrService) {
    this.pageTitleSubject = new BehaviorSubject<any>('Dashboard');
    this.pageTitle = this.pageTitleSubject.asObservable();
  }

  public baseUrl = 'https://my.api.mockaroo.com/';

  public defaultErrorMessage = 'Something went wrong , Please try again later';

  public baseSearchReq: BaseSearchCriteria = {
    page: 1,
    pageSize: 10,
    keyword: '',
    sortBy: '',
    sortAscending: true,
    currentRows: 0,
    fromDate: '',
    toDate: '',
    totalRowCount: 10,
    numericPageCount: 1
  };

  public userType = {
    SuperAdmin : 1,
    SupportAdmin : 2,
    LimitedAdmin : 3,
    FirmAdmin : 4,
    Firm : 5,
    Reporter : 6,
    Lawyer : 7
  };

  public PartnerTypes =
    {
        YesLaw : 1,
        Firm : 2,
        IndividualReporter : 3,
        LawFirm : 4
    };

  public userData = {};

  public get pageTitleValue(): any {
    return this.pageTitleValue.value;
  }

  public setPageTitleValue(model: any ) {
    this.pageTitleSubject.next(model);
  }

  public showError (err) {
    if (err.status === 400 ) {
      const errorList  = Object.keys(err.error);
      // for (let index = 0; index < errorList.length; index++) {
        this.toastr.error(err.statusText);
      // }
    } else if (err.code === 12 || err.errorItemList === null) {
      this.toastr.error(err.friendlyMessage);
    } else {
      for (let index = 0; index < err.errorItemList.length; index++) {
        this.toastr.error(err.errorItemList[index].value);
      }
    }
 }
}
