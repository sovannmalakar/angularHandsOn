import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ListComponent } from './user/list/list.component';
import { CreateComponent } from './user/create/create.component';
import { DisplayErrorComponent } from './display-error/display-error.component';
import { ReporterListComponent } from './reporter/reporter-list/reporter-list.component';

import { ReporterServiceService } from './reporter/service/reporter-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddReporterComponent } from './reporter/create/add-reporter/add-reporter.component';
import { LoginUserComponent } from './login/login-user/login-user.component';
import { LogoutComponent } from './logout/logout-service/logout/logout.component'; 
import { LoginServiceService } from './login/login-service/login-service.service';
import { AppService } from './app.service';
import { NavServiceService } from './navbar/nav-service.service';
import { MyInterceptorService } from './my-interceptor.service';
import { ReporterTableViewComponent } from './reporter/reporter-table-view/reporter-table-view.component';
import { ReporterListViewComponent } from './reporter/reporter-list-view/reporter-list-view.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    ListComponent,
    CreateComponent,
    DisplayErrorComponent,
    ReporterListComponent,
    AddReporterComponent,
    LoginUserComponent,
    LogoutComponent,
    ReporterTableViewComponent,
    ReporterListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ReporterServiceService, LoginServiceService, AppService, NavServiceService, NavbarComponent,
   { provide: HTTP_INTERCEPTORS, useClass: MyInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
