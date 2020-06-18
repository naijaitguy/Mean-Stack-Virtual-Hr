import { Component, OnInit } from '@angular/core';
import { ApplicationModel } from 'src/app/Models/ApplicationModel';
import { ApplicationServiceService } from 'src/app/Services/application-service.service';
import { JobModel } from 'src/app/Models/JobModel';
import { JobServiceService } from 'src/app/Services/job-service.service';

@Component({
  selector: 'app-allapllications',
  templateUrl: './allapllications.component.html',
  styleUrls: ['./allapllications.component.css']
})
export class AllapllicationsComponent implements OnInit {

  constructor( private Applicationservice: ApplicationServiceService, private Jobservice: JobServiceService) { 

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.count
    };


  }
  Jobs: JobModel[];
Applications: ApplicationModel[];
config;
 count: any;

  ngOnInit(): void {

    this.loadJobs();
    this.loadAllApllications()
  }
  loadJobs(){

    this.Jobservice.GetAllJobs().subscribe( data => { this.Jobs = data;  }, err => {console.error(err)});
   
     }

  loadAllApllications(){

 this.Applicationservice.GetAllApplications()
 .subscribe(
    data => { this.Applications = data; this.count = data.length; },
    err => {console.error(err)});

  }


pageChanged(event){
  this.config.currentPage = event;
}

}










