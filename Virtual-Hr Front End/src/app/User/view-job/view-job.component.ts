import { Component, OnInit } from '@angular/core';
import { JobServiceService } from 'src/app/Services/job-service.service';
import { JobModel } from 'src/app/Models/JobModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  constructor( private Jobservice: JobServiceService, private avRout: ActivatedRoute) {




  }

Jobs: JobModel;
JobID;

  ngOnInit(): void {
    const paramid = 'id';
    if (this.avRout.snapshot.params[paramid])
    {this.JobID = this.avRout.snapshot.params[paramid];
     this.Jobservice.GetJobByID(this.JobID).subscribe(
    data => { this.Jobs = data; },
    err => { });
    }


  }



}



