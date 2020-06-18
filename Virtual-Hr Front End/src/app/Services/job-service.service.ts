import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { JobModel } from '../Models/JobModel';


@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor( private Http: HttpClient ) { }

  GetAllJobs(): Observable <JobModel[]>{

    return this.Http.get<JobModel[]>(environment.ApiPath + 'Job/GetAllJobs');

  }

CreateJob(JobModel){

return this.Http.post(environment.ApiPath + 'Job/CreateJob', JobModel);

}


GetJobByID(Id): Observable <JobModel>{

  return this.Http.get<JobModel>(environment.ApiPath + 'Job/GetJobById/' + Id);


}



    getToken(){

      return localStorage.getItem('token');

    }

}


