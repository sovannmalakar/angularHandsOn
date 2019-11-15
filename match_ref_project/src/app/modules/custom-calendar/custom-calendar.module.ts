import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomCalendarRoutingModule } from './custom-calendar-routing.module';
import { CustomCalendarContainerComponent } from './custom-calendar-container/custom-calendar-container.component';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CustomCalendarContainerComponent],
  imports: [
    NgbModule,
    CommonModule,
    CalendarModule,
    FormsModule,
    CustomCalendarRoutingModule,
    NgSelectModule
  ],
  exports: [CustomCalendarContainerComponent]
})
export class CustomCalendarModule { }
