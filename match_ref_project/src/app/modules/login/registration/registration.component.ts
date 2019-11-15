import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { Router } from '@angular/router';
import { LoginApiService } from '../login-api.service';
import { GlobalsService } from '../../../../app/shared/globals.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./../../../../vendor/styles/pages/authentication.scss']
})
export class RegistrationComponent implements OnInit {

  partnerTypeIdSelected = false;
  userTypeSelected = false;
  userTypeValue = '';
  userTypeId = 0;

  constructor(
    private appService: AppService,
    private router: Router,
    private loginApiService: LoginApiService,
    private global: GlobalsService
    ) {
      this.appService.pageTitle = 'Sign Up';
    }

    credentials = {
      name: '',
      email: '',
      password: ''
    };

  ngOnInit() {
    this.partnerTypeIdSelected = false;
  }

  goNext() {
     this.partnerTypeIdSelected = true;
  }

  selectUserTypeBack() {
    this.partnerTypeIdSelected = false;
  }
  selectUserType (type) {
    switch (type) {
      case this.global.PartnerTypes.Firm:
      this.userTypeId = this.global.PartnerTypes.Firm;
      this.userTypeValue = 'Firm';
      this.userTypeSelected = true;
      this.partnerTypeIdSelected = true;
      break;

      case this.global.PartnerTypes.IndividualReporter:
      this.userTypeId = this.global.PartnerTypes.IndividualReporter;
      this.userTypeValue = 'Reporter';
      this.userTypeSelected = true;
      this.partnerTypeIdSelected = true;
      break;

      case this.global.PartnerTypes.LawFirm:
      this.userTypeId = this.global.PartnerTypes.LawFirm;
      this.userTypeValue = 'Lawyer';
      this.userTypeSelected = true;
      this.partnerTypeIdSelected = true;
      break;
    }
  }



}
