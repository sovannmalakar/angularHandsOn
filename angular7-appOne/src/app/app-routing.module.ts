import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './user/list/list.component';
import { CreateComponent } from './user/create/create.component';
import { ReporterListComponent } from './reporter/reporter-list/reporter-list.component';
import { AddReporterComponent } from './reporter/create/add-reporter/add-reporter.component';
import { LoginUserComponent } from './login/login-user/login-user.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'user', component: ListComponent},
  { path: 'user/create', component: CreateComponent},
  // URL mapping for reporter list
  {path: 'reporter', component: ReporterListComponent},
  {path: 'reporter/create', component: AddReporterComponent},
  // URL for login user
  {path: 'login', component: LoginUserComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
