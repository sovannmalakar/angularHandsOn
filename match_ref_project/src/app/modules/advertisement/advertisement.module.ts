import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import { AdvertisementContainerComponent } from './advertisement-container/advertisement-container.component';


import { AddAdvertisementComponent } from './add-advertisement/add-advertisement.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SharedModule } from './../../shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';

import { AvatarModule } from 'ngx-avatar';
@NgModule({
  declarations: [ AdvertisementContainerComponent, AddAdvertisementComponent],
  imports: [
    CommonModule,
    AdvertisementRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    NgxDatatableModule,
    SharedModule,
    MultiselectDropdownModule,
    NgbModule,
    NgSelectModule,
    LaddaModule,
    AvatarModule
  ]
})
export class AdvertisementModule { }
