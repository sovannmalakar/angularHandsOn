import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileContainerComponent } from './user-profile-container/user-profile-container.component';

const routes: Routes = [{
  path: '',
  component: UserProfileContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
