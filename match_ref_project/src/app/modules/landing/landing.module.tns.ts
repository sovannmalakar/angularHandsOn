import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LandingContainerComponent } from './landing-container/landing-container.component';

@NgModule({
  declarations: [LandingContainerComponent],
  imports: [
    LandingRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LandingModule { }
