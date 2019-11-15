import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchJobsRoutingModule } from './search-jobs-routing.module';
import { SearchJobsContainerComponent } from './search-jobs-container/search-jobs-container.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from './../../shared/shared.module';
@NgModule({
  declarations: [SearchJobsContainerComponent],
  imports: [
    CommonModule,
    SearchJobsRoutingModule,
    PerfectScrollbarModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    SharedModule,
    MultiselectDropdownModule,
    AvatarModule
  ]
})
export class SearchJobsModule { }
