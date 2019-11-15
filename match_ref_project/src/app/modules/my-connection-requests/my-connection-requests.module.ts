import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyConnectionRequestsRoutingModule } from './my-connection-requests-routing.module';
import { MyConnectionRequestContainerComponent } from './my-connection-request-container/my-connection-request-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyConnectionRequestContainerComponent],
  imports: [
    CommonModule,
    MyConnectionRequestsRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class MyConnectionRequestsModule { }
