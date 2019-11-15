import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './ScreenOne/list/list.component';
import { AddComponent } from './ScreenOne/add/add.component';

const routes: Routes = [{
  path: 'list',
  component: ListComponent
},
{
  path: 'add',
  component: AddComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminnRoutingModule { }
