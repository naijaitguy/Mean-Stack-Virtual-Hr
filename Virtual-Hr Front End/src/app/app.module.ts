import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAuthComponent } from './Admin/admin-auth/admin-auth.component';
import { UserAuthComponent } from './User/user-auth/user-auth.component';
import { UserheaderComponent } from './User/Layout/userheader/userheader.component';
import { UserfooterComponent } from './User/Layout/userfooter/userfooter.component';

import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './Services/auth-service.service';
import { JobServiceService } from './Services/job-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { JobApplicationComponent } from './User/job-application/job-application.component';
import { CreateJobComponent } from './Admin/Job/create-job/create-job.component';
import { ViewJobComponent } from './User/view-job/view-job.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllapllicationsComponent } from './Admin/Applications/allapllications/allapllications.component';
import { SingleapllicationsComponent } from './Admin/Applications/singleapllications/singleapllications.component';
import { RequestInterceptor } from './_Helper/RequestInterceptor';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { UsermanageaccountComponent } from './User/usermanageaccount/usermanageaccount.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';
import { AdminHeaderComponent } from './Admin/admin-header/admin-header.component';
import { AdminprofileComponent } from './Admin/adminprofile/adminprofile.component';
import { AdminmanageaccountComponent } from './Admin/adminmanageaccount/adminmanageaccount.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminAuthComponent,
    UserAuthComponent,
    UserheaderComponent,
    UserfooterComponent,
    UserRegistrationComponent,
    UserHomeComponent,
    JobApplicationComponent,
    CreateJobComponent,
    ViewJobComponent,
    AllapllicationsComponent,
    SingleapllicationsComponent,
    SidebarComponent,
    UsermanageaccountComponent,
    UserprofileComponent,
    AdminHeaderComponent,
    AdminprofileComponent,
    AdminmanageaccountComponent,
    AboutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [AuthServiceService, { provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
