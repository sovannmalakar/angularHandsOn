import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInfoRoutingModule } from './company-info-routing.module';
import { CompanyInfoContainerComponent } from './company-info-container/company-info-container.component';

import { SharedModule } from './../../shared/shared.module';

import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';

import { NouisliderModule } from 'ng2-nouislider';
@NgModule({
  declarations: [CompanyInfoContainerComponent],
  imports: [
    CommonModule,
    CompanyInfoRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    LaddaModule,
    NouisliderModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CompanyInfoModule { }
