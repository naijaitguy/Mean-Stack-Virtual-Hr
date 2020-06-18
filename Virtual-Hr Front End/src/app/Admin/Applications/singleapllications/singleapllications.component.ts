import { Component, OnInit } from '@angular/core';
import { ApplicationModel } from 'src/app/Models/ApplicationModel';
import { ApplicationServiceService } from 'src/app/Services/application-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleapllications',
  templateUrl: './singleapllications.component.html',
  styleUrls: ['./singleapllications.component.css']
})
export class SingleapllicationsComponent implements OnInit {

  constructor( private service: ApplicationServiceService, private avRout: ActivatedRoute) {




  }

Jobs: ApplicationModel;
JobID;

  ngOnInit(): void {
    const paramid = 'id';
    if (this.avRout.snapshot.params[paramid])
    {this.JobID = this.avRout.snapshot.params[paramid];
     this.service.GetApplicationByID(this.JobID).subscribe(
    data => { this.Jobs = data; },
    err => { });
    }


  }



}



