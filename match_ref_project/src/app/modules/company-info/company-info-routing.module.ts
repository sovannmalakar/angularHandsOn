import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoContainerComponent } from './company-info-container/company-info-container.component';

const routes: Routes = [{
  path: '',
  component: CompanyInfoContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInfoRoutingModule { }
