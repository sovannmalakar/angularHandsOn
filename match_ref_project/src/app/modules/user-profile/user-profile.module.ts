import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileContainerComponent } from './user-profile-container/user-profile-container.component';


import { SharedModule } from './../../shared/shared.module';

import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule } from 'angular2-ladda';

import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [UserProfileContainerComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    LaddaModule
  ],
  exports: [
    UserProfileContainerComponent
],
})
export class UserProfileModule { }
