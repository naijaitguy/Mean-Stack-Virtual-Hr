import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApplicationModel } from '../Models/ApplicationModel';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  constructor( private Http: HttpClient ) { }

  

  GetAllApplications(): Observable <ApplicationModel[]>{

    return this.Http.get<ApplicationModel[]>(environment.ApiPath + 'Application/GetAllApplication');
  }

CreateApplication(ApplicationModel, Job_ID){

return this.Http.post(environment.ApiPath + 'Application/ApplyForJob/' + Job_ID, ApplicationModel);

}


GetApplicationByID(Id): Observable <ApplicationModel>{

  return this.Http.get<ApplicationModel>(environment.ApiPath + 'Application/GetAllApplicationById/' + Id);

}



    getToken(){

      return localStorage.getItem('token');

    }

}


