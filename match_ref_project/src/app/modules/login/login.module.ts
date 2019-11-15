import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from './../../shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SharedModule,
    LaddaModule,
    NgbModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class LoginModule { }
