import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobServiceService } from 'src/app/Services/job-service.service';
import { JobModel } from 'src/app/Models/JobModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  FormData: FormGroup;
  Submitted = false;
  Success = false;
  Loading = false;

  Jobs: JobModel;
  JobID;
  
  constructor( private Fb: FormBuilder , private JobServices: JobServiceService, private avRout:ActivatedRoute) { 


    this.FormData = this.Fb.group({

     CompanyName: [ '' , Validators.compose([ Validators.required])],
     Location: [ '' , Validators.compose([ Validators.required])],
     JobTitle: [ '' , Validators.compose([ Validators.required])],
     ExpiringDate: [ '' , Validators.compose([ Validators.required])],
     Experience: [ '' , Validators.compose([ Validators.required])],
     JobType: [ '' , Validators.compose([ Validators.required])],
     Requirement: [ '' , Validators.compose([ Validators.required])],
     Qualification: [ '' , Validators.compose([ Validators.required])],
     Responsibility: [ '' , Validators.compose([ Validators.required])],
     Description: [ '' , Validators.compose([ Validators.required])],
     JobField: [ '' , Validators.compose([ Validators.required])],
   
     

    });
  }

  
    ngOnInit(): void {
      const paramid = 'id';
      if (this.avRout.snapshot.params[paramid])
      {this.JobID = this.avRout.snapshot.params[paramid];
       this.JobServices.GetJobByID(this.JobID).subscribe(
      data => { this.Jobs = data; },
      err => { });
      }
  
  
    }


  get f(){  return this.FormData.controls; }

  ProcessForm(){

  
    this.Submitted = true;

    let JobModel = { CompanyName: this.f.CompanyName.value,

      JobTitle: this.f.JobTitle.value,
      
      ExpiringDate: this.f.ExpiringDate.value,
      
      Location: this.f.Location.value,
      
       Discription: this.f.Description.value,
      
       Requirement: this.f.Requirement.value,
      
      JobType: this.f.JobType.value,
      
       Qualification: this.f.Qualification.value,
      
       YearsOfExperience: this.f.Experience.value,
      
      JobField: this.f.JobField.value,
      
      Responsibility: this.f.Responsibility.value,
      
      
      
      };

    if(!this.FormData.valid){ return false;}else{

this.Loading = true;

this.JobServices.CreateJob(JobModel).subscribe(
  data => { this.Loading = false; this.Success = true;},
   error=>{ this.Loading = false; console.log(error)});

    }
  }

}
