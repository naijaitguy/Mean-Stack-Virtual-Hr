import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthComponent } from './User/user-auth/user-auth.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { AdminAuthComponent } from './Admin/admin-auth/admin-auth.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { AuthGaurd } from './_Helper/AuthGaurd';
import {AdminAuthGaurd} from './_Helper/AdminAuthGaurd';
import { JobApplicationComponent } from './User/job-application/job-application.component';
import { CreateJobComponent } from './Admin/Job/create-job/create-job.component';
import { ViewJobComponent } from './User/view-job/view-job.component';
import { AllapllicationsComponent } from './Admin/Applications/allapllications/allapllications.component';
import { SingleapllicationsComponent } from './Admin/Applications/singleapllications/singleapllications.component';
import { UsermanageaccountComponent } from './User/usermanageaccount/usermanageaccount.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';
import { AdminmanageaccountComponent } from './Admin/adminmanageaccount/adminmanageaccount.component';
import { AdminprofileComponent } from './Admin/adminprofile/adminprofile.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
//////// identity route ----------------
 { path: '' , pathMatch: 'full', redirectTo: 'User/Jobs/JobList'},

 { path : 'Identity/User/Authentication', component: UserAuthComponent},
 { path : 'Identity/User/Registration', component: UserRegistrationComponent},

 { path : 'Identity/Admin/Authentication', component:  AdminAuthComponent},

 { path : 'Admin', component:  AdminAuthComponent},

 ///////////////////////////////////////////////////////////////
 { path : 'User/Jobs/JobList', component:  UserHomeComponent},
 { path : 'User/Jobs/JobList/ViewJob/:id', component:  ViewJobComponent},
 { path : 'About', component:  AboutComponent},
 { path : 'Application/Jobs/Apply/:id', component:  JobApplicationComponent, canActivate:[AuthGaurd]},
 { path : 'User/ManageAccount', component:  UsermanageaccountComponent, canActivate:[AuthGaurd]},
 { path : 'User/MyProfile', component:  UserprofileComponent, canActivate:[AuthGaurd]},
 { path : 'Admin/Jobs/CreateJobPost', component:  CreateJobComponent, canActivate:[AdminAuthGaurd]},
 { path : 'Admim/Application/Allapplications', component: AllapllicationsComponent, canActivate:[AdminAuthGaurd]},

 { path : 'Admin/ManageAccount', component:  AdminmanageaccountComponent, canActivate:[AdminAuthGaurd]},
 { path : 'Admin/MyProfile', component:  AdminprofileComponent, canActivate:[AdminAuthGaurd]},
 { path : 'Admin/Application/ViewApplication/:id', component:  SingleapllicationsComponent, canActivate:[AdminAuthGaurd]},
 { path : '**', redirectTo: 'Identity/User/Authentication' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
