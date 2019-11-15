import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CustomCalendarModule } from './../custom-calendar/custom-calendar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [DashboardContainerComponent],
  imports: [
    CommonModule,
    Ng2ChartsModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    CustomCalendarModule,
    NgbModule
  ]
})
export class DashboardModule { }
