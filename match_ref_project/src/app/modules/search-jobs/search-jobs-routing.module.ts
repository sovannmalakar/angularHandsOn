import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchJobsContainerComponent } from './search-jobs-container/search-jobs-container.component';

const routes: Routes = [{
  path: '',
  component: SearchJobsContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchJobsRoutingModule { }
