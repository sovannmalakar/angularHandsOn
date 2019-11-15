import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchReportersContainerComponent } from './search-reporters-container/search-reporters-container.component';

const routes: Routes = [{
  path: '',
  component: SearchReportersContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchReportersRoutingModule { }
