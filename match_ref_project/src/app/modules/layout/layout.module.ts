import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfileModule } from './../user-profile/user-profile.module';

// *******************************************************************************
// Layouts


import { Layout1FlexComponent } from './layout-1-flex/layout-1-flex.component';



// *******************************************************************************
// Components

import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from './layout-sidenav/layout-sidenav.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';


// *******************************************************************************
// Libs

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavModule } from '../../../vendor/libs/sidenav/sidenav.module';


// *******************************************************************************
// Services

import { LayoutService } from './layout.service';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SidenavModule,
    UserProfileModule
  ],
  declarations: [

    Layout1FlexComponent,

    LayoutNavbarComponent,
    LayoutSidenavComponent,
    LayoutFooterComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule { }
