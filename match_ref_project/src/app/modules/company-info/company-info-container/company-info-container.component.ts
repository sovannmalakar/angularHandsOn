import { Component, OnInit } from '@angular/core';
import { GlobalsService } from './../../../../app/shared/globals.service';
import { CompanyInfoService } from './../services/company-info.service';
import { first } from 'rxjs/operators';
import { userInfo } from 'os';
import { PartnerProfileModel } from '../../../core/model/partner-profile.model';
import { AppApiService } from '../../../core/services/app-api.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-company-info-container',
  templateUrl: './company-info-container.component.html',
  styleUrls: ['./company-info-container.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class CompanyInfoContainerComponent implements OnInit {

  hideIfLawyer = false;
  hideIfReporter = false;

  products: Array<any> = [];
  newArray: Array<any> = [];
  certificates: Array<any> = [];
  newCertificationArray: Array<any> = [];
  memberships: Array<any> = [];
  newMembershipArray: Array<any> = [];
  showNotificationOptions = true;

  miles = [
    { value: 1, label: 'Within 1 Mile' },
    { value: 2, label: 'Within 2 Miles' },
    { value: 5, label: 'Within 5 Miles' },
    { value: 10, label: 'Within 10 Miles' },
    { value: 25, label: 'Within 25 Miles' },
    { value: 50, label: 'Within 50 Miles' },
    { value: 100, label: 'Within 100 Miles' },
    { value: 200, label: 'Within 200 Miles' }
  ];

  constructor(private global: GlobalsService, private toaster: ToastrService,
    private appApiService: AppApiService, private companyInfoService: CompanyInfoService,
    private session: SessionService) {
    this.global.setPageTitleValue('Company Information');

    this.hideIfLawyer = session.currentUserValue.userType === global.userType.Lawyer ? true : false;
    this.hideIfReporter = session.currentUserValue.userType === global.userType.Reporter ? true : false;
  }

  loading = false;
  userInfo: PartnerProfileModel = {
    userGuid: '',
    userName: '',
    partnerGuid: '',
    partnerAddedDate: '',
    partnerPaymentMethod: '',
    active: null,
    partnerNum: '',
    partnerBillEmail: '',
    quickbooksId: '',
    partnerBillLine1: '',
    partnerBillLine2: '',
    partnerBillLine3: '',
    partnerLocationDisplayName: '',
    partnerLocationAddress1: '',
    partnerLocationAddress2: '',
    partnerLocationCity: '',
    partnerLocationState: '',
    partnerLocationZip: '',
    partnerLocationCountry: '',
    partnerTypeId: 0,
    partnerContactFName: '',
    partnerContactLName: '',
    partnerContactPhone: '',
    partnerContactEmail: '',
    partnerBillName: '',
    partnerBillPhone: '',
    partnerBillAddress1: '',
    partnerBillAddress2: '',
    partnerBillCity: '',
    partnerBillState: '',
    partnerBillZip: '',
    partnerBillCountry: '',
    partnerBillFax: '',
    latitude: 0,
    longitude: 0,
    userType: null,
    displayPartnerLocation: null,
    stenographCustomerId: null,
    partnerContractStartDate: '',
    notes: '',
    cCLastFour: '',
    cCExpDate: '',
    cCBillingZip: '',
    createdDate: '',
    createdBy: '',
    modifiedDate: '',
    modifiedBy: '',
    userFirstName: '',
    userLastName: '',
    notificationForJobsWithInMilies: 10,
    productGuids: [],
    sendNotification: true,
    notificationThroughEmail: true,
    notificationThroughSms: true,
    notificationThroughAppNotification: true,
    remoteSiteAvailability: true,
    onSiteAvailability: true,
    products: [],
    certifications: [],
    memberships: []
  };

  // tslint:disable-next-line:max-line-length
  selectStates = [{ 'name': 'Alabama', 'abbreviation': 'AL' }, { 'name': 'Alaska', 'abbreviation': 'AK' }, { 'name': 'American Samoa', 'abbreviation': 'AS' }, { 'name': 'Arizona', 'abbreviation': 'AZ' }, { 'name': 'Arkansas', 'abbreviation': 'AR' }, { 'name': 'California', 'abbreviation': 'CA' }, { 'name': 'Colorado', 'abbreviation': 'CO' }, { 'name': 'Connecticut', 'abbreviation': 'CT' }, { 'name': 'Delaware', 'abbreviation': 'DE' }, { 'name': 'District Of Columbia', 'abbreviation': 'DC' }, { 'name': 'Federated States Of Micronesia', 'abbreviation': 'FM' }, { 'name': 'Florida', 'abbreviation': 'FL' }, { 'name': 'Georgia', 'abbreviation': 'GA' }, { 'name': 'Guam', 'abbreviation': 'GU' }, { 'name': 'Hawaii', 'abbreviation': 'HI' }, { 'name': 'Idaho', 'abbreviation': 'ID' }, { 'name': 'Illinois', 'abbreviation': 'IL' }, { 'name': 'Indiana', 'abbreviation': 'IN' }, { 'name': 'Iowa', 'abbreviation': 'IA' }, { 'name': 'Kansas', 'abbreviation': 'KS' }, { 'name': 'Kentucky', 'abbreviation': 'KY' }, { 'name': 'Louisiana', 'abbreviation': 'LA' }, { 'name': 'Maine', 'abbreviation': 'ME' }, { 'name': 'Marshall Islands', 'abbreviation': 'MH' }, { 'name': 'Maryland', 'abbreviation': 'MD' }, { 'name': 'Massachusetts', 'abbreviation': 'MA' }, { 'name': 'Michigan', 'abbreviation': 'MI' }, { 'name': 'Minnesota', 'abbreviation': 'MN' }, { 'name': 'Mississippi', 'abbreviation': 'MS' }, { 'name': 'Missouri', 'abbreviation': 'MO' }, { 'name': 'Montana', 'abbreviation': 'MT' }, { 'name': 'Nebraska', 'abbreviation': 'NE' }, { 'name': 'Nevada', 'abbreviation': 'NV' }, { 'name': 'New Hampshire', 'abbreviation': 'NH' }, { 'name': 'New Jersey', 'abbreviation': 'NJ' }, { 'name': 'New Mexico', 'abbreviation': 'NM' }, { 'name': 'New York', 'abbreviation': 'NY' }, { 'name': 'North Carolina', 'abbreviation': 'NC' }, { 'name': 'North Dakota', 'abbreviation': 'ND' }, { 'name': 'Northern Mariana Islands', 'abbreviation': 'MP' }, { 'name': 'Ohio', 'abbreviation': 'OH' }, { 'name': 'Oklahoma', 'abbreviation': 'OK' }, { 'name': 'Oregon', 'abbreviation': 'OR' }, { 'name': 'Palau', 'abbreviation': 'PW' }, { 'name': 'Pennsylvania', 'abbreviation': 'PA' }, { 'name': 'Puerto Rico', 'abbreviation': 'PR' }, { 'name': 'Rhode Island', 'abbreviation': 'RI' }, { 'name': 'South Carolina', 'abbreviation': 'SC' }, { 'name': 'South Dakota', 'abbreviation': 'SD' }, { 'name': 'Tennessee', 'abbreviation': 'TN' }, { 'name': 'Texas', 'abbreviation': 'TX' }, { 'name': 'Utah', 'abbreviation': 'UT' }, { 'name': 'Vermont', 'abbreviation': 'VT' }, { 'name': 'Virgin Islands', 'abbreviation': 'VI' }, { 'name': 'Virginia', 'abbreviation': 'VA' }, { 'name': 'Washington', 'abbreviation': 'WA' }, { 'name': 'West Virginia', 'abbreviation': 'WV' }, { 'name': 'Wisconsin', 'abbreviation': 'WI' }, { 'name': 'Wyoming', 'abbreviation': 'WY' }];

  selectCounntries = [
    { value: 'USA', label: 'USA' }
  ];

  ngOnInit() {
    this.getUserInfo();
  }

  milesChanged(e) {
    this.userInfo.notificationForJobsWithInMilies = e;
  }

  getUserInfo() {
    const self = this;
    this.companyInfoService.getUserInfo()
      .pipe(first())
      .subscribe(result => {
        if (result && !result.isSuccess) {
          this.toaster.error('');
        } else {
          this.userInfo = result.model;
          if (this.session.currentUserValue.userType !== this.global.userType.Lawyer) {
            this.appApiService.getAllProductsForSelection().subscribe((data) => {
              self.products = data.model;
              // tslint:disable-next-line:max-line-length
              self.products = self.products.map(x => ({ ...x, checked: Boolean(result.model.products['find'](a => a.productGuid === x.productGuid && a.productName === x.productName)) }));
              for (let i = 0; i < self.products.length; i += 3) {
                self.newArray.push({ items: self.products.slice(i, i + 3) });
              }
            });

            this.appApiService.getAllCertificationForSelection().subscribe((data) => {
              this.certificates = data.model;
              // tslint:disable-next-line:max-line-length
              self.certificates = self.certificates.map(x => ({ ...x, checked: Boolean(result.model.certifications['find'](a => a.certificationGuid === x.certificationGuid && a.certificationName === x.certificationName)) }));
              for (let i = 0; i < this.certificates.length; i += 2) {
                this.newCertificationArray.push({ items: this.certificates.slice(i, i + 2) });
              }
            });

            this.appApiService.getAllMembershipForSelection().subscribe((data) => {
              this.memberships = data.model;
              // tslint:disable-next-line:max-line-length
              self.memberships = self.memberships.map(x => ({ ...x, checked: Boolean(result.model.memberships['find'](a => a.membershipGuid === x.membershipGuid && a.membershipName === x.membershipName)) }));
              for (let i = 0; i < this.memberships.length; i += 1) {
                this.newMembershipArray.push({ items: this.memberships.slice(i, i + 1) });
              }
            });
          }
        }
      },
        error => {
        });
  }

  changeNotification(values: any) {
    if (values.currentTarget.checked) {
      this.userInfo.notificationThroughSms = true;
      this.userInfo.notificationThroughAppNotification = true;
      this.userInfo.notificationThroughEmail = true;
      this.showNotificationOptions = true;
      this.userInfo.sendNotification = values.currentTarget.checked;
    } else {
      this.showNotificationOptions = false;
      this.userInfo.sendNotification = values.currentTarget.checked;
      this.userInfo.notificationThroughSms = false;
      this.userInfo.notificationThroughAppNotification = false;
      this.userInfo.notificationThroughEmail = false;
    }
  }

  changeNotificationSms(values: any) {
    this.userInfo.notificationThroughSms = values.currentTarget.checked;
  }
  changeNotificationApp(values: any) {
    this.userInfo.notificationThroughAppNotification = values.currentTarget.checked;
  }
  changeNotificationEmail(values: any) {
    this.userInfo.notificationThroughEmail = values.currentTarget.checked;
  }

  changeOnSiteAvailibility(values: any) {
    this.userInfo.onSiteAvailability = values.currentTarget.checked;
  }
  changeRemoteSiteAvailability(values: any) {
    this.userInfo.remoteSiteAvailability = values.currentTarget.checked;
  }

  changeCheckbox(tags, i, j) {
    if (tags) {
      this.newArray[i].items[j].checked = !this.newArray[i].items[j].checked;
    }
    // tslint:disable-next-line:max-line-length
    this.userInfo.products = [].concat.apply([], this.newArray.map(f => f.items)).filter(f => f.checked === true).map(({ checked, ...f }) => f);
  }

  changeCertificationCheckbox(tags, i, j) {
    if (tags) {
      this.newCertificationArray[i].items[j].checked = !this.newCertificationArray[i].items[j].checked;
    }
    // tslint:disable-next-line:max-line-length
    this.userInfo.certifications = [].concat.apply([], this.newCertificationArray.map(f => f.items)).filter(f => f.checked === true).map(({ checked, ...f }) => f);
  }

  changemembershipCheckbox(tags, i, j) {
    if (tags) {
      this.newMembershipArray[i].items[j].checked = !this.newMembershipArray[i].items[j].checked;
    }
    // tslint:disable-next-line:max-line-length
    this.userInfo.memberships = [].concat.apply([], this.newMembershipArray.map(f => f.items)).filter(f => f.checked === true).map(({ checked, ...f }) => f);
  }

  productSelected(e) {
  }

  onUpdate() {
    this.loading = true;
    this.companyInfoService.updateUserInfo(this.userInfo)
      .pipe(first())
      .subscribe(result => {
        this.loading = false;
        if (result && !result.isSuccess) {
        } else {
          if (result.model) {
            this.toaster.success('company Info Updated Successfully');
            this.newArray = [];
            this.newMembershipArray = [];
            this.newCertificationArray = [];
            this.getUserInfo();
          }
        }
      },
        error => {
          this.loading = false;
          this.toaster.warning(error.friendlyMessage);
          //   this.errors = error.errorItemList;
        });
  }
}
