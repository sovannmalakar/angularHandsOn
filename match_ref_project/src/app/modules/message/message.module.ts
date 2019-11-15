import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageContainerComponent } from './message-container/message-container.component';



import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [MessageContainerComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    PerfectScrollbarModule,
    SharedModule,
    AvatarModule,
    NgbModule,
    FormsModule
  ]
})
export class MessageModule { }
