import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyConnectionRequestContainerComponent } from './my-connection-request-container/my-connection-request-container.component';

const routes: Routes = [{
  path: '',
  component: MyConnectionRequestContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyConnectionRequestsRoutingModule { }
