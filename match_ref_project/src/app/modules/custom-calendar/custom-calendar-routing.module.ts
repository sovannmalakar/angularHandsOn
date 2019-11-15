import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomCalendarContainerComponent } from './custom-calendar-container/custom-calendar-container.component';

const routes: Routes = [{
  path: '',
  component: CustomCalendarContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomCalendarRoutingModule { }
