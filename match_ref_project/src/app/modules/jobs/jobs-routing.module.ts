import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsContainerComponent } from './jobs-container/jobs-container.component';

const routes: Routes = [{
  path: '',
  component: JobsContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
