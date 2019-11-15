import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchContainerComponent } from './search-container/search-container.component';

const routes: Routes = [
  {
    path: '',
    component: SearchContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
