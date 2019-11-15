import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRepliesRoutingModule } from './job-replies-routing.module';
import { JobRepliesContainerComponent } from './job-replies-container/job-replies-container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from './../../shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [JobRepliesContainerComponent],
  imports: [
    CommonModule,
    JobRepliesRoutingModule,
    PerfectScrollbarModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    AvatarModule,
    SharedModule,
    MultiselectDropdownModule,
    NgSelectModule,
    NgbModule,
    AutocompleteLibModule
  ]
})
export class JobRepliesModule { }
