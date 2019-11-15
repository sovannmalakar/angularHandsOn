import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// *******************************************************************************
// Layouts


import { Layout1FlexComponent } from './modules/layout/layout-1-flex/layout-1-flex.component';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';
import { Z_FULL_FLUSH } from 'zlib';

// *******************************************************************************
// Auth Guard

import { AuthGuard } from '././core/guard/auth.guard';

// *******************************************************************************
// Routes

const routes: Routes = [

  { path: 'adminScreenOne',  loadChildren: './modules/adminn/adminn.module#AdminnModule'},
  { path: 'landing',  loadChildren: './modules/landing/landing.module#LandingModule'},
  { path: 'auth',  loadChildren: './modules/login/login.module#LoginModule'},
  { path: 'auth',  loadChildren: './modules/login/login.module#LoginModule'},
  {
    path: '', component: Layout1FlexComponent, canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'searchjobs', loadChildren: './modules/search-jobs/search-jobs.module#SearchJobsModule'},
      { path: 'searchreporters', loadChildren: './modules/search-reporters/search-reporters.module#SearchReportersModule'},
      { path: 'jobs', loadChildren: './modules/jobs/jobs.module#JobsModule'},
      { path: 'contacts', loadChildren: './modules/contacts/contacts.module#ContactsModule'},
      // tslint:disable-next-line:max-line-length
      { path: 'myConnectionRequests', loadChildren: './modules/contacts/contacts.module#ContactsModule'},
      { path: 'calendar', loadChildren: './modules/custom-calendar/custom-calendar.module#CustomCalendarModule'},
      { path: 'message', loadChildren: './modules/message/message.module#MessageModule'},
      { path: 'advertisement', loadChildren: './modules/advertisement/advertisement.module#AdvertisementModule'},
      { path: 'jobreplies', loadChildren: './modules/job-replies/job-replies.module#JobRepliesModule'},
      { path: 'companyInfo', loadChildren: './modules/company-info/company-info.module#CompanyInfoModule'},
      { path: 'userProfile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule'}


      // #################################   will initialize later ############################

      // { path: 'caselist', loadChildren: './modules/case/activities.module#ActivitiesModule'},
    ]
  }

];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
