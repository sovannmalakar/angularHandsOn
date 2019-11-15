import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsContainerComponent } from './contacts-container/contacts-container.component';
import { ContactDetailContainerComponent } from './contact-detail-container/contact-detail-container.component';
import { MyConnectionRequestsComponent } from './my-connection-requests/my-connection-requests.component';

const routes: Routes = [{
  path: '',
  component: ContactsContainerComponent
},
{
  path: 'connectioRequests',
  component: MyConnectionRequestsComponent
},
{
  path: ':id',
  component: ContactDetailContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
