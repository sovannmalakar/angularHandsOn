
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ElementRef, NgZone, Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { LoginApiService } from '../../modules/login/login-api.service';
import { GlobalsService } from './../../shared/globals.service';
import { first } from 'rxjs/operators';
import { Error } from './../../core/model/error.model';
import { ErrorItem } from './../../core/model/error-item.model';
import { ToastrService } from 'ngx-toastr';
import { AppApiService } from '../../core/services/app-api.service';



@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss']
})
export class UserInfoFormComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;
  @Input() userTypeId;
  loading = false;
  products: Array<any> = [];
  newArray: Array<any> = [];
  certificates: Array<any> = [];
  newCertificationArray: Array<any> = [];
  memberships: Array<any> = [];
  newMembershipArray: Array<any> = [];

  constructor(private router: Router,
    public global: GlobalsService,
    private loginApiService: LoginApiService,
    private ngZone: NgZone,
    private appApiService: AppApiService,
    private toaster: ToastrService) {
    this.appApiService.getAllProductsForSelection().subscribe((data) => {
      console.log(data);
      this.products = data.model;
      this.products.map(item => item.checked = false);
      for (let i = 0; i < this.products.length; i += 3) {
        this.newArray.push({ items: this.products.slice(i, i + 3) });
      }
    });

    this.appApiService.getAllCertificationForSelection().subscribe((data) => {
      console.log(data);
      this.certificates = data.model;
      this.certificates.map(item => item.checked = false);
      for (let i = 0; i < this.certificates.length; i += 2) {
        this.newCertificationArray.push({ items: this.certificates.slice(i, i + 2) });
      }
    });

    this.appApiService.getAllMembershipForSelection().subscribe((data) => {
      console.log(data);
      this.memberships = data.model;
      this.memberships.map(item => item.checked = false);
      for (let i = 0; i < this.memberships.length; i += 1) {
        this.newMembershipArray.push({ items: this.memberships.slice(i, i + 1) });
      }
    });
  }
  errors = [];
  reEnterpassword = '';
  userInfo = {
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
    password: '',
    userType: null,
    productGuids: [],
    certificationGuids: [],
    membershipGuids: []
  };

  // tslint:disable-next-line:max-line-length
  selectStates = [{ 'name': 'Alabama', 'abbreviation': 'AL' }, { 'name': 'Alaska', 'abbreviation': 'AK' }, { 'name': 'American Samoa', 'abbreviation': 'AS' }, { 'name': 'Arizona', 'abbreviation': 'AZ' }, { 'name': 'Arkansas', 'abbreviation': 'AR' }, { 'name': 'California', 'abbreviation': 'CA' }, { 'name': 'Colorado', 'abbreviation': 'CO' }, { 'name': 'Connecticut', 'abbreviation': 'CT' }, { 'name': 'Delaware', 'abbreviation': 'DE' }, { 'name': 'District Of Columbia', 'abbreviation': 'DC' }, { 'name': 'Federated States Of Micronesia', 'abbreviation': 'FM' }, { 'name': 'Florida', 'abbreviation': 'FL' }, { 'name': 'Georgia', 'abbreviation': 'GA' }, { 'name': 'Guam', 'abbreviation': 'GU' }, { 'name': 'Hawaii', 'abbreviation': 'HI' }, { 'name': 'Idaho', 'abbreviation': 'ID' }, { 'name': 'Illinois', 'abbreviation': 'IL' }, { 'name': 'Indiana', 'abbreviation': 'IN' }, { 'name': 'Iowa', 'abbreviation': 'IA' }, { 'name': 'Kansas', 'abbreviation': 'KS' }, { 'name': 'Kentucky', 'abbreviation': 'KY' }, { 'name': 'Louisiana', 'abbreviation': 'LA' }, { 'name': 'Maine', 'abbreviation': 'ME' }, { 'name': 'Marshall Islands', 'abbreviation': 'MH' }, { 'name': 'Maryland', 'abbreviation': 'MD' }, { 'name': 'Massachusetts', 'abbreviation': 'MA' }, { 'name': 'Michigan', 'abbreviation': 'MI' }, { 'name': 'Minnesota', 'abbreviation': 'MN' }, { 'name': 'Mississippi', 'abbreviation': 'MS' }, { 'name': 'Missouri', 'abbreviation': 'MO' }, { 'name': 'Montana', 'abbreviation': 'MT' }, { 'name': 'Nebraska', 'abbreviation': 'NE' }, { 'name': 'Nevada', 'abbreviation': 'NV' }, { 'name': 'New Hampshire', 'abbreviation': 'NH' }, { 'name': 'New Jersey', 'abbreviation': 'NJ' }, { 'name': 'New Mexico', 'abbreviation': 'NM' }, { 'name': 'New York', 'abbreviation': 'NY' }, { 'name': 'North Carolina', 'abbreviation': 'NC' }, { 'name': 'North Dakota', 'abbreviation': 'ND' }, { 'name': 'Northern Mariana Islands', 'abbreviation': 'MP' }, { 'name': 'Ohio', 'abbreviation': 'OH' }, { 'name': 'Oklahoma', 'abbreviation': 'OK' }, { 'name': 'Oregon', 'abbreviation': 'OR' }, { 'name': 'Palau', 'abbreviation': 'PW' }, { 'name': 'Pennsylvania', 'abbreviation': 'PA' }, { 'name': 'Puerto Rico', 'abbreviation': 'PR' }, { 'name': 'Rhode Island', 'abbreviation': 'RI' }, { 'name': 'South Carolina', 'abbreviation': 'SC' }, { 'name': 'South Dakota', 'abbreviation': 'SD' }, { 'name': 'Tennessee', 'abbreviation': 'TN' }, { 'name': 'Texas', 'abbreviation': 'TX' }, { 'name': 'Utah', 'abbreviation': 'UT' }, { 'name': 'Vermont', 'abbreviation': 'VT' }, { 'name': 'Virgin Islands', 'abbreviation': 'VI' }, { 'name': 'Virginia', 'abbreviation': 'VA' }, { 'name': 'Washington', 'abbreviation': 'WA' }, { 'name': 'West Virginia', 'abbreviation': 'WV' }, { 'name': 'Wisconsin', 'abbreviation': 'WI' }, { 'name': 'Wyoming', 'abbreviation': 'WY' }];

  selectCounntries = [
    { value: 'USA', label: 'USA' }
  ];
  ngOnInit() {
    this.userInfo.partnerTypeId = this.userTypeId;
  }

  changeCheckbox(tags, i, j) {
    if (tags) {
      this.newArray[i].items[j].checked = !this.newArray[i].items[j].checked;
    }
    // tslint:disable-next-line:max-line-length
    console.log([].concat.apply([], this.newArray.map(f => f.items)).filter(f => f.checked === true).map(({ productGuid }) => productGuid));
    // tslint:disable-next-line:max-line-length
    this.userInfo.productGuids = [].concat.apply([], this.newArray.map(f => f.items)).filter(f => f.checked === true).map(({ productGuid }) => productGuid);
  }

  changeCertificationCheckbox(tags, i, j) {
    if (tags) {
      this.newCertificationArray[i].items[j].checked = !this.newCertificationArray[i].items[j].checked;
    }
    // tslint:disable-next-line:max-line-length
    console.log([].concat.apply([], this.newCertificationArray.map(f => f.items)).filter(f => f.checked === true).map(({ certificationGuid }) => certificationGuid));
    // tslint:disable-next-line:max-line-length
    this.userInfo.certificationGuids = [].concat.apply([], this.newCertificationArray.map(f => f.items)).filter(f => f.checked === true).map(({ certificationGuid }) => certificationGuid);
  }

  changemembershipCheckbox(tags, i, j) {
    if (tags) {
      this.newMembershipArray[i].items[j].checked = !this.newMembershipArray[i].items[j].checked;
    }
    // tslint:disable-next-line:max-line-length
    console.log([].concat.apply([], this.newMembershipArray.map(f => f.items)).filter(f => f.checked === true).map(({ membershipGuid }) => membershipGuid));
    // tslint:disable-next-line:max-line-length
    this.userInfo.membershipGuids = [].concat.apply([], this.newMembershipArray.map(f => f.items)).filter(f => f.checked === true).map(({ membershipGuid }) => membershipGuid);
  }

  productSelected(e) {
    this.userInfo.productGuids = e;
  }

  //   onRegister(data) {
  //     console.log(data);
  //     this.router.navigate(['auth/login']);
  //  }
  onRegister() {
    if (this.userInfo.password !== this.reEnterpassword) {
      this.toaster.warning('Password you entered dosent match');
    } else if (this.userInfo.productGuids.length <= 0 && this.userTypeId !== this.global.PartnerTypes.LawFirm) {
      this.toaster.warning('Please Select at least one service');
    } else {
      this.loading = true;
      this.loginApiService.userRegister(this.userInfo)
        .pipe(first())
        .subscribe(result => {
          if (result && !result.isSuccess) {
            this.loading = false;
          } else {
            this.toaster.success('Successfully registered in YesMatch');
            this.loading = false;
            this.router.navigate(['/']);
          }
        },
          error => {
            this.loading = false;
            this.global.showError(error);
            this.errors = error.errorItemList;
          });
    }
  }

  goToLanding () {
    this.router.navigate(['/landing']);
  }

}
