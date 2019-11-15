import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppApiService } from '../../../core/services/app-api.service';

import { ReporterSearchCriteria } from './../../../core/model/search/reporter-search-criteria.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { FormControl, ɵangular_packages_forms_forms_f } from '@angular/forms';
import { ZipCodeModel } from '../../../core/model/zip-code.model';
import {UserProfileModel } from './../../../core/model/user-profile.model';
import { UserProfileService} from './../services/user-profile.service';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'rxjs/add/operator/toPromise';
import { ReporterSearchResultModel } from '../../../core/model/reporter-search-result.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from '../../../core/services/session.service';
@Component({
  selector: 'app-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile-container.component.scss']
})
export class UserProfileContainerComponent implements OnInit {

  constructor(private global: GlobalsService , private userProfileService: UserProfileService, private toaster: ToastrService) {
    this.global.setPageTitleValue('User Profile');
  }

  @Input() private updateSuccess: EventEmitter<boolean>;

  loading = false;
  userInfo: UserProfileModel = {
    userGuid:  '',
    userName:  '',
    userType: null,
    active: true,
    firstName:  '',
    lastName:  '',
    email:  '',
    partnerGuid:  '',
    partnerCompanyName: ''
  };

  ngOnInit() {
    this.getProfile();
    if (this.updateSuccess) {
      this.updateSuccess.subscribe(data => {
        this.onUpdate();
      });
    }
  }

  getProfile() {
    this.userProfileService.getUserInfo()
              .pipe(first())
              .subscribe(result => {
                if (result && !result.isSuccess) {
                } else {
                  this.userInfo = result.model;
                }
                },
                  error => {
                    // this.toaster.warning(error.friendlyMessage);
                    //   this.errors = error.errorItemList;
                  });
  }

  onUpdate() {
    this.loading = true;
    this.userProfileService.updateUserInfo(this.userInfo)
    .pipe(first())
    .subscribe(result => {
      this.loading = false;
      if (result && !result.isSuccess) {
      } else {
        this.userInfo = result.model;
        this.getProfile();
        this.toaster.success('User Updated Successfully');
      }
      },
        error => {
          this.loading = false;
          // this.toaster.warning(error.friendlyMessage);
          //   this.errors = error.errorItemList;
        });
  }

  onCancel () {
  }

}
