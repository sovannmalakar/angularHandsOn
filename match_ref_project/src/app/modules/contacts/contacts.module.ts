import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsContainerComponent } from './contacts-container/contacts-container.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactDetailContainerComponent } from './contact-detail-container/contact-detail-container.component';
import { SharedModule } from './../../shared/shared.module';
import { MyConnectionRequestsComponent } from './my-connection-requests/my-connection-requests.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [ContactsContainerComponent, ContactDetailContainerComponent, MyConnectionRequestsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AvatarModule
  ]
})
export class ContactsModule { }
