import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsContainerComponent } from './jobs-container/jobs-container.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SharedModule } from './../../shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgSelectModule } from '@ng-select/ng-select';
import { AvatarModule } from 'ngx-avatar';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
@NgModule({
  declarations: [JobsContainerComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    NgxDatatableModule,
    FormsModule,
    PerfectScrollbarModule,
    SharedModule,
    MultiselectDropdownModule,
    NgSelectModule,
    NgbModule,
    AutocompleteLibModule,
    AvatarModule
  ]
})
export class JobsModule { }
