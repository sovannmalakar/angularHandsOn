import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementContainerComponent } from './advertisement-container/advertisement-container.component';
import { AddAdvertisementComponent } from './add-advertisement/add-advertisement.component';
const routes: Routes = [{
  path: '',
  component: AdvertisementContainerComponent
},
{
  path: 'addAdvertisement',
  component: AddAdvertisementComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule { }
