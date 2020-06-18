import { Component, OnInit } from '@angular/core';
import { loadavg } from 'os';
import { JobServiceService } from 'src/app/Services/job-service.service';
import { Observable } from 'rxjs';
import { JobModel } from 'src/app/Models/JobModel';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor( private Jobservice: JobServiceService) { 

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.count
    };


  }

Jobs: JobModel[];
config;
 count:any;

  ngOnInit(): void {

    this.loadJobs();
  }

  loadJobs(){

 this.Jobservice.GetAllJobs().subscribe( data => { this.Jobs = data; this.count = data.length; }, err => {console.error(err)});

  }




pageChanged(event){
  this.config.currentPage = event;
}

}



