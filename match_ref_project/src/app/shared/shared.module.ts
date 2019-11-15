import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';
import { NgxChipsExampleComponent } from './user-info-form/ngx-chips-example.component';
import { TagInputModule } from 'ngx-chips';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarTextPipe } from './pipe/avatar-text.pipe';
import { PairsPipe } from './pipe/two-column.pipe';
import { CustomMapComponent } from './custom-map/custom-map.component';
import { LaddaModule } from 'angular2-ladda';

import { DateTimePipe } from './pipe/date-time.pipe';


import {
    MapModule,
    MapAPILoader,
    MarkerTypeId,
    IMapOptions,
    IBox,
    IMarkerIconInfo,
    WindowRef,
    DocumentRef,
    MapServiceFactory,
    BingMapAPILoaderConfig,
    BingMapAPILoader,
    GoogleMapAPILoader,
    GoogleMapAPILoaderConfig
  } from 'angular-maps';


  export function MapServiceProviderFactory() {
    const bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
    bc.apiKey = 'AhHHmZuy3FcE3CCDd8G5FnMoVaq0QMWZHZk6g334YB4ZzR2mVk8qG3Py3T1IWE5e'; // your bing map key
    bc.branch = 'experimental';
        // to use the experimental bing brach. There are some bug fixes for
        // clustering in that branch you will need if you want to use
        // clustering.
    return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
  }
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TagInputModule,
        NgSelectModule,
        NgbModule,
        LaddaModule,
        MapModule.forRoot()
     ],
    declarations: [
        UserInfoFormComponent,
        NgxChipsExampleComponent,
        CustomPaginationComponent,
        AvatarTextPipe,
        CustomMapComponent,
        PairsPipe,
        DateTimePipe
    ],
    exports: [
        UserInfoFormComponent,
        NgxChipsExampleComponent,
        CustomPaginationComponent,
        CustomMapComponent,
        AvatarTextPipe,
        PairsPipe,
        DateTimePipe
    ],
    providers: [
        { provide: MapAPILoader, deps: [], useFactory: MapServiceProviderFactory }
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
