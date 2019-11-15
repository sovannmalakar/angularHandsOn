import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminnRoutingModule } from './adminn-routing.module';
import { ListComponent } from './ScreenOne/list/list.component';
import { AddComponent } from './ScreenOne/add/add.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';



@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    AdminnRoutingModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    MultiselectDropdownModule
  ]
})
export class AdminnModule { }
