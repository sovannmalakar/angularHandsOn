import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchReportersRoutingModule } from './search-reporters-routing.module';
import { SearchReportersContainerComponent } from './search-reporters-container/search-reporters-container.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from './../../shared/shared.module';
@NgModule({
  declarations: [SearchReportersContainerComponent],
  imports: [
    CommonModule,
    SearchReportersRoutingModule,
    PerfectScrollbarModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    MultiselectDropdownModule,
    AutocompleteLibModule,
    SharedModule,
    AvatarModule
  ]
})
export class SearchReportersModule { }
